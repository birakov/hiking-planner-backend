module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      login: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      fio: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
      },
      telephon: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      userrole_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    }, {
      tableName: 'users',
      timestamps: true,
    });
  
    return User;
  };