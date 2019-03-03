'use strict';

const { ditoEventsUri } = require('../../config');
const Request = require('request');

const getEvents = () => {
  return new Promise((resolve, reject) => {
    Request.get(ditoEventsUri, (error, response, body) => {
      if (error) return reject(error);
      else if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(
          new Error('eventsUri (' + ditoEventsUri + ') return status code ' + response.statusCode)
        );
      }
      return resolve(JSON.parse(body)['events']);
    });
  });
};

const buildTimeline = async () => {
  try {
    var events = await getEvents();

    // ordernar por evento
    events = events.sort((a, b) => {
      if (a.event < b.event) return -1;
      if (a.event > b.event) return 1;
      return 0;
    });

    // agrupar produtos
    events = events.reduce((acc, val, ix) => {
      let customData = val.custom_data.reduce((acc2, val2) => {
        acc2[val2.key] = val2.value;
        return acc2;
      }, {});

      if (val.event === 'comprou') {
        acc[customData.transaction_id] = {
          timestamp: val.timestamp,
          revenue: val.revenue,
          transaction_id: customData.transaction_id,
          store_name: customData.store_name,
          products: []
        };
      } else if (val.event === 'comprou-produto') {
        acc[customData.transaction_id].products.push({
          name: customData.product_name,
          price: customData.product_price
        });
      }

      return acc;
    }, {});

    // transformar obj em array
    events = Object.keys(events).reduce((acc, val) => {
      acc.push(events[val]);
      return acc;
    }, []);

    // ordernar a timeline
    events = events.sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1;
      if (a.timestamp > b.timestamp) return -1;
      return 0;
    });

    return { timeline: events };
  } catch (e) {
    throw e;
  }
};

exports.get_all_purchases = async function(req, res, next) {
  try {
    var timeline = await buildTimeline();
    res.json(timeline);
  } catch (e) {
    next(e);
  }
};
