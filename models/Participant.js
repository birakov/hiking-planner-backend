module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
        defaultValue: 'pending',
      },
      role: {
        type: DataTypes.ENUM('organizer', 'participant', 'guide'),
        defaultValue: 'participant',
      },
    }, {
      tableName: 'participants',
      timestamps: true,
    });
  
    return Participant;
  };