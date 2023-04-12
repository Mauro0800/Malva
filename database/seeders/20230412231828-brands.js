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
        name: 'Bohemia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Polywood',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Red Simil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mason',
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
