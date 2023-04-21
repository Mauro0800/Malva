'use strict';

/** @type {import('sequelize-cli').Migration} */

const addressesJSON = require('../../data/addresses.json');

const addresses = addressesJSON.map(({address, city, province, zipCode}) => {
   return{
      address,
      city,
      province,
      zipCode,
      createdAt: new Date(),
      updatedAt: new Date()
   }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Addresses', addresses, {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('People', null, {});
    
  }
};
