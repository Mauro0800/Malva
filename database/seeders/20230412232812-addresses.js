'use strict';

/** @type {import('sequelize-cli').Migration} */

const addressesJSON = require('../../data/addresses.json');

const addresses = addressesJSON.map(({name, city, province, zipCode}) => {
   return{
      name,
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
