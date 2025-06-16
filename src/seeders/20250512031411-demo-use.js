'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    //cac ptu chen vao databate, bulkInsert chen nhieu du lieu vao database cung 1 luc, tham chieu toi models User chen vao databese
    await queryInterface.bulkInsert('Users', [{
      email: 'John Doe',
      password: '',
      username: ''
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};