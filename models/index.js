const sequelize = require('../config/db');
const DataTypes = require('sequelize').DataTypes;

const Trip = require('./Trip')(sequelize, DataTypes);
const Participant = require('./Participant')(sequelize, DataTypes);

Trip.hasMany(Participant, { foreignKey: 'trip_id' });
Participant.belongsTo(Trip, { foreignKey: 'trip_id' });

module.exports = {
  sequelize,
  Trip,
  Participant,
};