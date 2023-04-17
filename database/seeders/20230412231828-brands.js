'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Brands', [
      {
        name: 'malva',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'trademark',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'bohemia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'polywood',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'red Simil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'mason',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'otro',
        createdAt: new Date(),
        updatedAt: new Date()
      }
     ],
     {});
  
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Brands', null, {});
    
  }
};
