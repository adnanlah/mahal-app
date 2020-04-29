'use strict'

import { app, protocol, BrowserWindow, ipcMain, shell } from 'electron'
import sqlite3 from 'sqlite3'
import moment from 'moment'
import path from 'path'
import Umzug from 'umzug'
import fs from 'fs'
// import fse from 'fs-extra'
import DocumentGenerator from './utils/DocumentGenerator.js'
import migrationsList from './utils/MigrationsList.js'
import {getParams} from './utils/HelperFunctions.js'

const dbs = require('./models').default;
let {sequelize, Sequelize} = dbs;
const Op = Sequelize.Op;

const dataDir = path.join(app.getPath('exe'), `../data`);
const documentsDir = app.getPath('documents');

if (!fs.existsSync(dataDir)){
    fs.mkdirSync(path.join(dataDir, '/documents'), { recursive: true });
    fs.mkdirSync(path.join(dataDir, '/productsimages'), { recursive: true });
}
let dg = new DocumentGenerator(dataDir, documentsDir);

const umzug = new Umzug({
  migrations: {
    path: './src/migrations',
    params: [
      sequelize.getQueryInterface(), Sequelize
    ]
  },
  storage: 'sequelize',
  storageOptions: { sequelize }
});
(async () => {
  try {
    await umzug.up()
    console.log('All migrations performed successfully')
  } catch(e) {
    console.log('Umzug Error', e)
  }
})()

import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST)
      win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

/*
  *** INVOICE CRUD ***
*/
ipcMain.on('create_invoice', function (event, data) {
  let {invoice, invoiceComputed, modelName} = data;
  let {payments, inputs, invoiceData} = invoice;
  let invoiceFullData = {...invoiceData, ...invoiceComputed};
  let {itCounts, isPurchase} = getParams(modelName);

  sequelize.transaction(function (transaction) {

    let productUpdates = inputs.map(input => {
      if (itCounts && modelName == "PurchaseInvoice") {
        return dbs.Product.update({
            quantity: sequelize.literal(`(quantity + ${input.quantity})`),
            sum_purchase_price: sequelize.literal(`(sum_purchase_price + ${input.unity_price})`),
            average_purchase_price: sequelize.literal(`(sum_purchase_price + ${input.unity_price}) / (number_purchase_prices + 1)`),
            number_purchase_prices: sequelize.literal(`number_purchase_prices + 1`)
          },
          {
            where: {
              id: input.ProductId
            },
            transaction
          }
        )
        
      } else if (itCounts && (modelName == 'SaleInvoice' || modelName == 'CounterSale')) {
        return dbs.Product.update({
            quantity: sequelize.literal(`(quantity - ${input.quantity})`),
          },
          {
            where: {
              id: input.ProductId
            },
            transaction
          }
        )
      } else {
        return null;
      }
    })

    return Promise.all(productUpdates)
    .then(() => {
      let productsPromises = dbs.Product.findAll({
        where: {
          id: {[Op.or]: inputs.map(i => i.ProductId)} }
        }, {transaction});
      let createInvoicePromise = dbs[modelName].create(invoiceFullData, {
        include: invoiceFullData.payments ? [ dbs.Payment ] : [],
        transaction
      });
      return Promise.all([productsPromises, createInvoicePromise])
    })
    .then(function ([products, invoice]) {
      products.map((p) => {
        let m_p = Object.assign({
          counts: itCounts,
        }, inputs.filter(i => i.ProductId === p.id)[0]);
        return p[modelName + '_Product'] = m_p;
      })
      return Promise.all([invoice.setItems(products, { through: {}, individualHooks: true, transaction}), invoice]);
    })
    .then(() => {
      return dbs.Log.create({
        message: 'Facture a été bien crée.'
      })
    })
  })
  .then((results) => {
    if (invoice.isPrinted) {
      return dbs[modelName].findByPk(results[1].dataValues.id, {
        include: [{model: dbs.Product, as: 'Items'}]
      })
    } else {
      return null;
    }
  })
  .then((invoice) => {
    console.log('---inv', invoice)
    if (invoice)
      return dg.pdf([invoice], modelName);
    else
      return null;
  })
  .then((pdfFile) => {
    console.log('pdf' ,pdfFile)
    console.log('typeof pdf' ,typeof pdfFile)
    return event.sender.send('invoice_created', {status: true, message: `Facture bien ajouté!`, pdfFile});
  })
  .catch(function (e) {
    console.log('Transaction has been rolled back: ', e)
    return event.sender.send('invoice_created', {status: false, message: `Facture pas bien ajouté ${e.message}`});
  });
});

ipcMain.on('update_invoice', function (event, data) {
  let {invoiceData, invoiceComputed, modelName} = data;
  let invoiceFullData = {...invoiceData, ...invoiceComputed};
  let {itCounts, isPurchase} = getParams(modelName);
  
  sequelize.transaction(function (transaction) {

    return dbs[modelName + '_Product'].findAll({
      where: {
        '${modelName} + id': invoiceData.id
      }
    }, {
      transaction
    })
    .then((items) => {
      if (items[0].dataValues.counts)
          return null;

      let resetProducts = items.map((item) => {
        if (modelName == "PurchaseInvoice") {
          return dbs.Product.update({
            quantity: sequelize.literal(`(quantity - ${item.quantity})`),
            sum_purchase_price: sequelize.literal(`(sum_purchase_price - ${item.unity_price})`),
            average_purchase_price: sequelize.literal(`(sum_purchase_price - ${item.unity_price}) / (number_purchase_prices - 1)`),
            number_purchase_prices: sequelize.literal(`number_purchase_prices - 1`)
          },
            {
              where: {
                id: item.ProductId
              },
              transaction
            }
          )
        } else if (modelName == 'SaleInvoice' || modelName == 'CounterSale') {
          return dbs.Product.update({
            quantity: sequelize.literal(`(quantity + ${item.quantity})`),
          },
            {
              where: {
                id: item.ProductId
              },
              transaction
            }
          )
        } else {
          return null;
        }

      })

      return Promise.all(resetProducts);
    })
    .then(() => {
      let productUpdates = inputs.map(input => {
        if (modelName == "PurchaseInvoice") {
          return dbs.Product.update({
            quantity: sequelize.literal(`(quantity + ${input.quantity})`),
            sum_purchase_price: sequelize.literal(`(sum_purchase_price + ${input.unity_price})`),
            average_purchase_price: sequelize.literal(`(sum_purchase_price + ${input.unity_price}) / (number_purchase_prices + 1)`),
            number_purchase_prices: sequelize.literal(`number_purchase_prices + 1`)
          },
            {
              where: {
                id: input.ProductId
              },
              transaction
            }
          )
          
        } else if (modelName == 'SaleInvoice' || modelName == 'CounterSale') {
          return dbs.Product.update({
            quantity: sequelize.literal(`(quantity - ${input.quantity})`),
          },
            {
              where: {
                id: input.ProductId
              },
              transaction
            }
          )
        } else {
          return null;
        }
      })

      return Promise.all(productUpdates);
    })
    .then(() => {
      let paymentsPromises = invoiceData.payments.map((payment) => {
        return dbs.Payment.upsert({
          where: payment
        }, transaction)
      })
      return Promise.all(paymentsPromises);
    })
    .then(([payments]) => {
      let productsPromises = dbs.Product.findAll({
        where: {
          id: {[Op.or]: inputs.map(i => i.ProductId)} }
        }, {transaction});
      let updatePromise = dbs[modelName].update(invoiceFullData, {
        where: {
          id: invoiceFullData.id
        }, transaction
      })

      return Promise.all([productsPromises, updatePromise, payments])
    })
    .then(([products, updatedInvoice, payments]) => {
      products.map((p) => {
        return p[modelName + '_Product'] = inputs.filter(i => i.ProductId === p.id)[0];
      })
      updatedInvoice.setPayments(payments, { through: {}, transaction});
      return updatedInvoice.setItems(products, { through: {}, transaction});
    })
    

  })
  .then(function (results) {
    console.log('Update Transaction has been committed: ', results)
    if (invoiceData.isPrinted) {
      let openFile = dg.pdf([results[1]], modelName);
      shell.openItem(openFile);
    }
    return event.sender.send('invoice_updated', {status: true, message: 'Facture bien modifié!'});
  })
  .catch(function (e) {
    console.log('Update Transaction has been rolled back: ', e.message)
    return event.sender.send('invoice_updated', {status: false, message: `Facture pas bien modifier ${e.message}`});
  }); 
});

ipcMain.on('delete_invoice', function (event, invoiceData) {
  let {id, modelName} = invoiceData;
  dbs[modelName].destroy({
      where: {
          id
      }
  }).then((r) => {
    return event.sender.send('invoice_deleted', {status: true, message: `Facture bien supprimé!`});
  }).catch(e => console.log('error deleting'))
    return event.sender.send('invoice_deleted', {status: false, message: `Facture pas bien supprimé ${e.message}`});
    // cascade + stock
});

/*
  *** RECETTE CRUD ***
*/

ipcMain.on('create_recette', (event, data) => {
  let {recetteData, isPrinted} = data;
  dbs.Recette.create(recetteData)
  .then((recette) => {
    if (isPrinted)
      return dg.pdf([recette], 'receiptvoucher')
    else
      return null;
  })
  .then((openFile) => {
    if (openFile)
      shell.openItem(openFile);
    else 
      return null;
  })
  .then(() => {
    event.sender.send('recette_created', {status: true, message: `Recette crée avec succée`});
  })
  .catch(e => event.sender.send('recette_created', {status: false, message: `Erreur dans Recette ${e.message}`}))
});

ipcMain.on('update_recette', (event, recette) => {
  dbs.Recette.update(recette, {
      where: {
        id: recette.id
      }
    })
    .then((recette) => {
      event.sender.send('recette_updated', {status: true, message: `Recette modifié avec succée`});
    })
    .catch(e => event.sender.send('recette_response', `Erreur dans update Recette ${e.message}`))
});

ipcMain.on('delete_recette', (event, id) => {
  dbs.Recette.findByPk(id)
    .then((recette) => {
      return recette.destroy();
    })
    .then((recette) => {
      event.sender.send('recette_deleted', {status: true, message:`Recette supprimé avec succée`});
    })
    .catch(e => event.sender.send('recette_response', `Erreur dans Recette ${e.message}`))
});

ipcMain.on('get_recettes', function (event, searchData) {
  dbs.Recette.findAll({
    where: {
      createdAt: {
        [Op.gt]: new moment(searchData.fromDate).startOf('day').format(),
        [Op.lt]: new moment(searchData.toDate).endOf('day').format()
      }
    }
  })
  .then((recettes) => {
    console.log()
    event.sender.send('recettes', recettes);
  })
  .catch(e => event.sender.send('error', `Erreur search Recette ${e.message}`))
});

ipcMain.on('get_recette_tasks', function (event, searchData) {
  dbs.Recette.findAll({
    where: {
      createdAt: {
        [Op.gt]: new moment().startOf('year').format(),
      }
    },
    attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('task')), 'task'],
    ],
    raw: true,
  })
  .then((recettes) => {
    return recettes.map(r => r.task)
  })
  .then(tasks => {
    if (tasks.length)
      event.sender.send('recette_tasks', tasks)
    else
      return Promise.reject('No tasks bro')
  })
  .catch(e => {
    console.log(`Erreur search Tasks ${e.message}`);
    event.sender.send('background_response', `Erreur search Tasks ${e.message}`)
  })
});

/*
  *** DEPENSE CRUD ***
*/

ipcMain.on('create_depenses', (event, input) => {
  dbs.Depense.bulkCreate(input)
    .then((depenses) => {
      event.sender.send('depenses_created', depenses);
    })
    .catch(e => console.log(`error creating depenses ${e.message}`))
});

ipcMain.on('depenses_mounted', function (event, dates) {
  dbs.Depense.findAll({
    where: {
      createdAt: {
        [Op.gt]: new moment(dates.from, 'YYYY-MM-DD').startOf('day').format(),
        [Op.lt]: new moment(dates.to, 'YYYY-MM-DD').endOf('day').format()
      }
    },
    include: [dbs.DepenseUse],
    raw: true
  })
  .then((depenses) => {
    event.sender.send('todays_depenses', depenses);
  })
  .catch(e => console.log(`error finding todays depenses ${e.message}`))
});

/*
  *** SEARCH INVOICES ***
*/

ipcMain.on('search_invoices', function (event, searchData) {
  let includeArray = [
    {model: dbs.Account, as: searchData.isPurchase ? 'Supplier' : 'Client'},
    {model: dbs.Product, as: 'Items', through: {}}
  ]
  if (searchData.modelName == 'SaleInvoice')
    includeArray.push({model: dbs.Payment})

  dbs[searchData.modelName].findAll({
    where: {
      date: {
        [Op.gt]: new moment(searchData.fromDate).startOf('day').format(),
        [Op.lt]: new moment(searchData.toDate).endOf('day').format(),
      }
    },
    include: includeArray
  })
  .then((searchedInvoices) => {
    return event.sender.send('searched_invoices', searchedInvoices);
  })
  .catch(e => console.log(`error finding all invoices ${e.message}`))
});

ipcMain.on('get_unpaid_invoices', function (event, searchData) {
  dbs.SaleInvoice.scope(searchData.type).findAll({
    include: [{model: dbs.Account, as: 'Client'}]
  })
  .then((unpaidInvoices) => {
    event.sender.send('unpaid_invoices', unpaidInvoices);
  })
  .catch(e => console.log(`error finding unpaid_invoices invoices ${e.message}`))
});

ipcMain.on('get_overdue_invoices', function (event, searchData) {
  dbs.SaleInvoice.scope('unpaid').findAndCountAll({
    where: {
      debt_alarm_date: {
        [Op.gt]: new moment().startOf('day').format()
      },
    },
    include: [{model: dbs.Account, as: 'Client'}]
  })
  .then((overdueInvoicesResult) => {
    event.sender.send('overdue_invoices', overdueInvoicesResult);
  })
  .catch(e => console.log(`error finding overdue_invoices invoices ${e.message}`))
});

/*
  *** PRODUCT CRUD ***
*/
ipcMain.on('create_product', function (event, productData) {
  dbs.Product.create(productData)
  .then((product) => {
    if (productData.image.base64)
      return product.addImage(productData.image)
    else
      return null
  })
  .then(() => {
    event.sender.send('product_created', {status: true, message: 'Produit a été bien créé!'});
  })
  .catch(e => {console.log(e), event.sender.send('product_created', {status: false, message: `Erreur creation du produit, ${e.message}`})})
});

ipcMain.on('update_product', function (event, productData) {
  return dbs.Product.update(productData, {
    where: {
      id: productData.id
    }
  })
  .then((product) => {
    return dbs.Image.update({base64: productData.image.base64}, {
      where: {
        id: product.ImageId
      }
    })
  })
  .then(() => {
    event.sender.send('product_updated', {status: true, message: 'Success'});
  })
  .catch(e => event.sender.send('product_updated', {status: false, message: `Erreur modification du produit, ${e.message}`}))
});

ipcMain.on('delete_product', function (event, id) {
  dbs.Product.findByPk(id)
  .then((p) => {
    let countPromises = [p.countPurchaseInvoices(), p.countPurchaseOrders(),
      p.countSaleInvoices(), p.countSaleOrders(),
      p.countCounterSale(), p.countProformats()]
    return Promise.all(countPromises)
  })
  .then((counts) => {
    console.log('--- count product', counts)
    if (counts.reduce((a, b) => a + b, 0) > 0) {
      return Promise.reject(new Error('belongs to invoices'));
    } else {
      return p.destroy()
    }
  })
  .then((product) => {
    event.sender.send('product_deleted', {status: true, message: 'Successefully deleted product'});
  })
  .catch(e => event.sender.send('product_deleted', {status: false, message: `Erreur suppression du produit, ${e.message}`}))
});

ipcMain.on('get_all_products', function (event, value) {
  // calculating quantities

  // dbs.Product.findAll({
  //   include: [dbs.ProductCategory],
  //   raw: true // make it false next
  // })
  // .then((products) => {
  //   console.log('--- products raw', products);
  // })
  // .catch(e => console.log(`error finding all products ${e.message}`))

  // dbs.ProductCategory.findAll({
  //   include: [dbs.Product],
  //   raw: true // make it false next
  // })
  // .then((productCategories) => {
  //   console.log('--- ProductCategory raw', productCategories);
  // })
  // .catch(e => console.log(`error finding all raw productCategories ${e.message}`))

  dbs.ProductCategory.findAll({
    include: [{model: dbs.Product, include: [dbs.Image]}],
    raw: false // make it false next
  })
  .then((productCategories) => {
    return productCategories.map((pc) => {
      return pc;
    })
  })
  .then((productCategories) => {
    event.sender.send('all_products', productCategories);
  })
  .catch(e => console.log(`error finding all productCategories ${e.message}`))
});


ipcMain.on('print_all_products', function (event, value) {
  dbs.ProductCategory.findAll({
    include: [dbs.Product],
    raw: false // make it false next
  })
  .then((productCategories) => {
    if (isPrinted) {
      let openFile = dg.pdf([productCategories], 'products');
      return shell.openItem(openFile);
    }
  })
  .catch(e => event.sender.send('error', `error finding all productCategories ${e.message}`))
});

ipcMain.on('get_next_product_id', function (event, value) {
  dbs.Product.findOne({
    order: [ [ 'createdAt', 'DESC' ]]
  })
  .then((product) => {
    if (product)
      return event.sender.send('next_product_id', Number(product.dataValues.id) + 1);
    else
      return event.sender.send('next_product_id', 1);
  })
  .catch(e => event.sender.send('error', `error next_product_id ${e.message}`))

})

/*
  *** SET COMPANY ***
*/

ipcMain.on('set_company', function (event, companyData) {

  dbs.Company.findByPk(1)
  .then(function(rec) {
    // update
    if(rec)
      return dbs.Company.update(companyData, {
        where: {
          id: 1
        }
      });
    // insert
    return dbs.Company.create(companyData);
  })
  .then(() => {
    return event.sender.send('company_saved', {status: true, message: `Entreprise bien ajouté!`});
  })
  .catch(e => {
    console.log('error', e)
    return event.sender.send('company_saved', {status: false, message: `Entreprise pas bien ajouté! ${e.message}`})
  });
});

ipcMain.on('get_company', function (event) {
  dbs.Company.findByPk(1, {raw: true})
  .then((company) => {
    event.sender.send('company', company)
  })
  .catch((e) => event.sender.send('company', {}));
});

/*
  *** Password ***
*/

ipcMain.on('set_password', function (event, passData) {
  
});

/*
  *** Print ***
*/

ipcMain.on('create-pdf', function (event, data) {
  dg.pdf(data.data, data.doc)
  .then((pdfFile) => {
    event.sender.send('pdf-created', {status: true, pdfFile))
  })
  .catch(e => event.sender.send('pdf-created', {status: false, messaage: `Error imprimer ${e.message}`}))
});