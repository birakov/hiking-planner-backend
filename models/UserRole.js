module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
      },
    }, {
      tableName: 'userroles',
      timestamps: true,
    });
  
    return UserRole;
  };