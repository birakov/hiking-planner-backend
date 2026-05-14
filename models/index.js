const sequelize = require('../config/db');
const DataTypes = require('sequelize').DataTypes;

const Trip = require('./Trip')(sequelize, DataTypes);
const Participant = require('./Participant')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const UserRole = require('./UserRole')(sequelize, DataTypes);

Trip.hasMany(Participant, { foreignKey: 'trip_id' });
Participant.belongsTo(Trip, { foreignKey: 'trip_id' });

User.hasMany(Participant, { foreignKey: 'user_id' });
Participant.belongsTo(User, { foreignKey: 'user_id' });

User.belongsTo(UserRole, { foreignKey: 'userrole_id' });
UserRole.hasMany(User, { foreignKey: 'userrole_id' });

module.exports = {
  sequelize,
  Trip,
  Participant,
  User,
  UserRole,
};