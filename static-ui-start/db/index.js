const db = require('./db');
const Place = require('./models/place');
const Hotel = require('./models/hotel');
const Restaurant = require('./models/restaurant');
const Activity = require('./models/activity');

// Associations
Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
  db,
  Place,
  Hotel,
  Restaurant,
  Activity,
};
