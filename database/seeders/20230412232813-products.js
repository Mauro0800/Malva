'use strict';

/** @type {import('sequelize-cli').Migration} */

const productsJSON = require('../../data/products.json');

const products = productsJSON.map(({name,price,description,discount,stock,image,distinguished,home,brandId,categoryId,materialId}) => {
  return{
    name,
    price,
    description,
    discount,
    home,
    distinguished,
    stock,
    image,
    brandId,
    categoryId,
    materialId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Products', products, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Products', null, {});
    
  }
};
