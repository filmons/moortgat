const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      // static associate(models) {
      //   this.belongsTo(models.proce, {as: 'proce', foreignKey: 'proce_id'});
      // }
    };
    Users.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      adresse: {
        type: DataTypes.STRING
      },

      

    }, {
      sequelize,
      modelName: 'Users',
    });
    return Users;
  };