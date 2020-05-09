'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
        name: 'Kit',
		description: 'description de kit',
		brand: 'Stako',
		selling_price: 350,
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		ProductCategoryId: 1,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }, {
        name: 'Piece',
		description: 'description de la piece',
		brand: 'BAC',
		selling_price: 450,
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 2,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }, {
        name: 'Reservoire',
		description: 'description de reservoire',
		brand: 'AMS',
		selling_price: 15000,
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 2,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }, {
        name: 'Bougie',
		description: 'description de la bougie',
		brand: 'Turkie',
		selling_price: 600,
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 1,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
