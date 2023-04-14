'use strict';

/** @type {import('sequelize-cli').Migration} */

const imagesJSON = require('../../data/images.json');
const images = imagesJSON.map(({name,productId}) => {
  return{
    name,
    productId,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Images', images, {});

  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};
