'use strict';

/** @type {import('sequelize-cli').Migration} */

const materialsJSON = require('../../data/material.json');

const materials = materialsJSON.map(({name}) => {
   return{
      name,
      createdAt: new Date(),
      updatedAt: new Date()
   }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Materials', materials, {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Materials', null, {});
    
  }
};
