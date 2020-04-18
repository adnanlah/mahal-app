const dbs = require('../../models');

const state = {
	accounts: null,
}

const getters = {
	ACCOUNTS: state => {
		return state.accounts
	},
	CLIENTS: state => {
		return state.accounts ? state.accounts.filter(a => a.type == 'client') : [];
	},
	SUPPLIERS: state => {
		return state.accounts ? state.accounts.filter(a => a.type == 'supplier') : [];
	},
	NEXT_ID: state => {
		return state.accounts.length ? Math.max(...state.accounts.map(acc => acc.id)) + 1 : 1;
	}
}

const mutations = {
	SET_ACCOUNT: (state, payload) => {
		state.accounts = payload;
	},

	ADD_ACCOUNT: (state, payload) => {
		state.accounts.push(payload)
	},
	UPDATE_ACCOUNT: (state, payload) => {
    	state.accounts[state.accounts.findIndex(a => a.id == payload.id)] = payload;
	},
	DELETE_ACCOUNT: (state, id) => {
		state.accounts.splice(state.accounts.findIndex(a => a.id == id), 1);
	},
}

const actions = {
	GET_ACCOUNT: (context) => {
		return dbs.default.Account.findAll({
  			raw: true,
  		})
		.then((accounts) => {
  			return context.commit('SET_ACCOUNT', accounts);
  		})
      	.catch((e) => Promise.reject(e));
   	},
   	SAVE_ACCOUNT: (context, payload) => {
   		console.log(payload)
   		return dbs.default.Account.create(payload)
   		.then((acc) => {
   			return context.commit('ADD_ACCOUNT', acc);
   		})
		.catch(e => {return console.log(e), Promise.reject(e)})
	},
   	UPDATE_ACCOUNT: (context, payload) => {
   		return dbs.default.Account.update(payload, {
   			where: {
   				id: payload.id
   			}
   		})
   		.then((updatedAcc) => {
	      return context.commit('UPDATE_ACCOUNT', updatedAcc);
	    })
	    .catch(e => Promise.reject(e))
	},
   	DELETE_ACCOUNT: (context, id) => {
   		return dbs.default.Account.findByPk(id)
	    .then((acc) => {
	    	let countPromises = [acc.countPurchaseInvoices(), acc.countPurchaseOrders(),
		    	acc.countSaleInvoices(), acc.countSaleOrders(),
		    	acc.countCounterSale(), acc.countProformat()]
	      	return Promise.all(countPromises)
	    })
	    .then((counts) => {
	      	if (counts.reduce((a, b) => a + b, 0) > 0)
	        	return Promise.reject(new Error('It has invoices'))
	      	else 
	      		return dbs.default.Account.destroy({where: {id}})
	    })
	    .then(() => {
	      	return context.commit('DELETE_ACCOUNT', id);
	    })
	    .catch(e => Promise.reject(e))
	},
}

export default {
    state, getters, mutations, actions
}