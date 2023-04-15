'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image,{
        as: 'images',
        foreignKey: 'productId',
        onDelete: 'cascade'
      });

      Product.belongsTo(models.Category,{
        as: 'category',
        foreignKey: 'categoryId',
      });

      Product.belongsTo(models.Brand,{
        as: 'brand',
        foreignKey: 'brandId'
      });

      Product.belongsTo(models.Material,{
        as: 'material',
        foreignKey: 'materialId'
      });

      Product.hasMany(models.Item,{
        as: 'items',
        foreignKey: 'id'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    home: DataTypes.BOOLEAN,
    distinguished: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};