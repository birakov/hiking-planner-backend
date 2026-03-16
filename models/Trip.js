module.exports = (sequelize, DataTypes) => {
    const Trip = sequelize.define('Trip', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      max_participants: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      },
      difficulty: {
        type: DataTypes.ENUM('easy', 'medium', 'hard'),
        defaultValue: 'medium',
      },
      status: {
        type: DataTypes.ENUM('planned', 'active', 'completed', 'cancelled'),
        defaultValue: 'planned',
      },
    }, {
      tableName: 'trips',
      timestamps: true,
    });
  
    return Trip;
  };