'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Accounts', [{
        type: 'supplier',
        name: 'Ghezzal',
        address: 'Oued semmar',
        city: 'Alger',
        phone: '027 00 00 00',
        mobile: '0770 00 00 00 / 0660 00 00 00',
        fax: '027 00 00 00',
        email: 'email@gmail.com',
        rc: '789654123',
        nif: '123456987',
        ai: '654987321',
        nis: '456987123',
        cap: '789654789',
        bank_account: '456321789',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        type: 'client',
        name: 'Adnan',
        address: 'Boutrifis',
        city: 'Djelfa',
        phone: '027 00 00 00',
        mobile: '0770 00 00 00 / 0660 00 00 00',
        fax: '027 00 00 00',
        email: 'email@gmail.com',
        rc: '789654123',
        nif: '123456987',
        ai: '654987321',
        nis: '456987123',
        cap: '789654789',
        bank_account: '456321789',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Accounts', null, {});
  }
};
