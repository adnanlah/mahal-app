module.exports = [
{
  name: '20200413022215-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      address: Sequelize.STRING,
      city: Sequelize.STRING,
      phone: Sequelize.STRING,
      mobile: Sequelize.STRING,
      fax: Sequelize.STRING,
      email: Sequelize.STRING,
      rc: Sequelize.STRING,
      nif: Sequelize.STRING,
      ai: Sequelize.STRING,
      nis: Sequelize.STRING,
      cap: Sequelize.STRING,
      bank_account: Sequelize.STRING,
      type: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accounts');
  }
},
{
  name: '20200413022216-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      address: Sequelize.STRING,
      city: Sequelize.STRING,
      phone: Sequelize.STRING,
      mobile: Sequelize.STRING,
      fax: Sequelize.STRING,
      email: Sequelize.STRING,
      rc: Sequelize.STRING,
      nif: Sequelize.STRING,
      ai: Sequelize.STRING,
      nis: Sequelize.STRING,
      cap: Sequelize.STRING,
      bank_account: Sequelize.STRING,
      logo: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('companies');
  }
},
{
  name: '20200413022217-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recettes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: Sequelize.FLOAT,
      amount_text: Sequelize.STRING,
      motive: Sequelize.STRING,
      client_name: Sequelize.STRING,
      client_info: Sequelize.STRING,
      date: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recettes');
  }
},
{
  name: '20200413022218-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Depenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: Sequelize.FLOAT,
      amount_text: Sequelize.STRING,
      designation: Sequelize.STRING,
      account: Sequelize.STRING,
      account_info: Sequelize.STRING,
      date: Sequelize.DATE,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Depenses');
  }
},
{
  name: '20200413022219-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: Sequelize.STRING,
      text: Sequelize.STRING,
      date: Sequelize.STRING,
      type: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
},
{
  name: '20200413022220-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments');
  }
},
{
  name: '20200413022221-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      selling_price: {
        type: Sequelize.FLOAT
      },
      image_path: {
        type: Sequelize.STRING
      },
      sum_purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      average_purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      number_purchase_prices: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
},
{
  name: '20200413022222-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductCategories');
  }
},
{
  name: '20200413022223-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CounterSales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client: {
        type: Sequelize.STRING
      },
      ttc: {
        type: Sequelize.FLOAT
      },
      ntp: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.STRING
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CounterSales');
  }
},
{
  name: '20200413022224-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CounterSale_Products', {
      CounterSaleId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      cost: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CounterSale_Products');
  }
},
{
  name: '20200413022225-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proformats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      pretax_amount: {
        type: Sequelize.FLOAT
      },
      tva_percentage: {
        type: Sequelize.FLOAT
      },
      tva: {
        type: Sequelize.FLOAT
      },
      ttc: {
        type: Sequelize.FLOAT
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Proformats');
  }
},
{
  name: '20200413022226-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proformat_Products', {
      ProformatId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      designation:  {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Proformat_Products');
  }
},
{
  name: '20200413022227-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseInvoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: Sequelize.STRING(100),
      date: Sequelize.STRING(100),
      payment_method: Sequelize.STRING(100),
      pretax_amount: Sequelize.FLOAT,
      tva_percentage: Sequelize.FLOAT,
      tva: Sequelize.FLOAT,
      ttc: Sequelize.FLOAT,
      timbres:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      ntp: Sequelize.FLOAT,
      ntp_text: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseInvoices');
  }
},
{
  name: '20200413022228-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseInvoice_Products', {
      PurchaseInvoiceId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseInvoice_Products');
  }
},
{
  name: '20200413022229-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: Sequelize.STRING(100),
      pretax_amount: Sequelize.FLOAT,
      tva_percentage: Sequelize.FLOAT,
      tva: Sequelize.FLOAT,
      ttc: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseOrders');
  }
},
{
  name: '20200413022230-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseOrder_Products', {
      PurchaseOrderId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      cost: Sequelize.FLOAT,
      designation:  {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseOrder_Products');
  }
},
{
  name: '20200413022231-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleInvoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: Sequelize.STRING(100),
      date: Sequelize.STRING(100),
      payment_method: Sequelize.STRING(100),
      pretax_amount: Sequelize.FLOAT,
      tva_percentage: Sequelize.FLOAT,
      tva: Sequelize.FLOAT,
      ttc: Sequelize.FLOAT,
      timbres:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      ntp: Sequelize.FLOAT,
      ntp_text: Sequelize.STRING,
      amount_paid: Sequelize.FLOAT,
      fully_paid: Sequelize.BOOLEAN,
      debt_last_date: Sequelize.DATE,
      debt_alarm_date: Sequelize.DATE,
      debt_note: Sequelize.STRING,
      debt_seen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SaleInvoices');
  }
},
{
  name: '20200413022232-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleInvoice_Products', {
      SaleInvoiceId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      cost: Sequelize.FLOAT,
      designation:  {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SaleInvoice_Products');
  }
},
{
  name: '20200413022233-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unity_price: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SaleOrders');
  }
},
{
  name: '20200413022234-create-table',
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleOrder_Products', {
      SaleOrderId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SaleOrder_Products');
  }
},
{
  name: '20200413022235-add-associations',
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Payments', // name of Source model
      'SaleInvoiceId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'SaleInvoices', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Products', // name of Source model
        'ProductCategoryId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'ProductCategories', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Proformats', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseInvoices', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseOrders', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleInvoices', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleOrders', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'CustomerId' // key we want to remove
    );
  }
}

]