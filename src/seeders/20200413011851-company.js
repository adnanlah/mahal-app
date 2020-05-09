'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [{
        name: 'ETS DJOUDI BOUAZA',
        description: 'Installateur GPL',
        address: 'Boutrifis',
        city: 'Djelfa',
        phone: '027 00 00 00',
        mobile: '0770 00 00 00 / 0660 00 00 00',
        fax: '027 00 00 00',
        email: 'email@gmail.com',
        rc: '123456789',
        nif: '123456789',
        ai: '123456789',
        nis: '123456789',
        cap: '123456789',
        bank_account: '123456789',
        // logo: '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',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
