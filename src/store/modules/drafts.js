const dbs = require('../../models');
const Op = dbs.default.Sequelize.Op;

const state = {
	drafts: []
}

const getters = {
	COUTERSALE_DRAFTS: state => {
		return state.drafts ? state.drafts.filter(d => d.modelName == 'CounterSale').map(d => d.invoiceData) : [];
	},
}

const mutations = {
	SET_DRAFT: (state, payload) => {
		state.drafts = payload;
	},
	ADD_DRAFT: (state, payload) => {
		state.drafts.push(payload)
	},
	DELETE_ACCOUNT: (state, id) => {
		state.drafts.splice(state.drafts.findIndex(a => a.ID == id), 1);
	},
}

const actions = {
  	UPDATE_DRAFT: (context, payload) => {
    	context.commit('ADD_DRAFT', payload);
  	},
  	DELETE_DRAFT: (context, payload) => {
    	context.commit('DELETE_DRAFT', payload);
  	}
}
export default {
    state, getters, mutations, actions
}