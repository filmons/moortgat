const {
    Model
  } = require('sequelize');
  module.exports = (sequelize, DataTypes) => {
    class proces extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Users, {as: 'Users', foreignKey: 'Users_id'});
      }
    };
    proces.init({
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      titre: {
        type: DataTypes.STRING
      },
      documents: {
        type: DataTypes.STRING
      },
      dateDeComentcemnt: {
        type: DataTypes.STRING
      },
      dateDeConsultation: {
        type: DataTypes.STRING
      },
      etat: {
        type: DataTypes.STRING
      },

      

    }, {
      sequelize,
      modelName: 'proces',
    });
    return proces;
  };