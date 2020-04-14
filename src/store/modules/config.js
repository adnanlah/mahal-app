const dbs = require('../../models');
const Op = dbs.default.Sequelize.Op;

const state = {
	config: {
		lang: 'fr',
	}
}

const getters = {
	CONFIG: state => {
		return state.config
	}
}

const mutations = {
	SET_CONFIG: (state, payload) => {
		state.config = payload;
	},
}

const actions = {
	GET_CONFIG: async (context) => {
    
  	},
  	SAVE_CONFIG: (context, payload) => {
    	context.commit('SET_CONFIG', payload);
  	}
}
export default {
    state, getters, mutations, actions
}