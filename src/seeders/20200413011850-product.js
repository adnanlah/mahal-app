'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
        name: 'Kit',
		description: 'description de kit',
		brand: 'Stako',
		selling_price: 350,
		image_path: '',
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		ProductCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Piece',
		description: 'description de la piece',
		brand: 'BAC',
		selling_price: 450,
		image_path: '',
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Reservoire',
		description: 'description de reservoire',
		brand: 'AMS',
		selling_price: 15000,
		image_path: '',
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Bougie',
		description: 'description de la bougie',
		brand: 'Turkie',
		selling_price: 600,
		image_path: '',
		sum_purchase_price: 0,
		average_purchase_price: 0,
		number_purchase_prices: 0,
		quantity: 0,
		quantity: 0,
		ProductCategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
