'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Prices.init({
    anhCK: DataTypes.TEXT,
    idUser: DataTypes.INTEGER,
    tienNap: DataTypes.INTEGER,
    id_thanhtoan: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
   
   
  }, {
    sequelize,
    modelName: 'Prices',
  });
  return Prices;
};