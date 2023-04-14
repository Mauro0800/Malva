'use strict';

/** @type {import('sequelize-cli').Migration} */

const usersJSON = require('../../data/users.json')

const users = usersJSON.map(({name, surname, email, password, addressId, rolId}) => {
   return{
      name,
      surname,
      email,
      password,
      addressId,
      rolId,
      createdAt: new Date(),
      updatedAt: new Date()
   }
})
   

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Users', users, {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
