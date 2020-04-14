'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   console.log('1', config.use_env_variable)
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   console.log('2', config.use_env_variable)
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const sequelize = new Sequelize(
  'InvoicesApp',
  'InvoicesApp',
  'InvoicesApp',
  {
    dialect: 'sqlite',
    storage: 'Makhzan.sqlite3'
  }
);
// console.log(__dirname)

const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync')
context.keys().map(context).forEach(module => {
  const sequelizeModel = module(sequelize, Sequelize);
  db[sequelizeModel.name] = sequelizeModel;
})

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {

//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  // console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// console.log(db)
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
