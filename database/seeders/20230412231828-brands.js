'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Brands', [
      {
        name: 'Malva',
        image: 'malva-logo-1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trademark',
        image: 'trademark.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bohemia',
        image: 'bohemia.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Polywood',
        image: 'polywood.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Red Simil',
        image: 'red-simil.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mason',
        image: 'mason.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Otro',
        image: 'otros.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tramontina',
        image: 'tramontina.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Oxo',
        image: 'oxo.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leifheit',
        image: 'leifheit.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'The Candle Shop',
        image: 'the-candle-shop.jpeg',
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
