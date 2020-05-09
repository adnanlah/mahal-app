const dbs = require('../../models');

const state = {
	company: null,
}

const getters = {
	COMPANY_DATA: state => {
		return state.company
	},
}

const mutations = {
	SET_COMPANY: (state, payload) => {
		state.company = payload;
	},
	ADD_COMPANY: (state, payload) => {
    	state.company = payload;
	},
	UPDATE_COMPANY: (state, payload) => {
    	state.company = payload;
	},
	DELETE_COMPANY: (state, id) => {
		state.company = null;
	},
}

const actions = {
	GET_COMPANY: (context) => {
		return dbs.default.Company.findByPk(1, {
  			raw: true,
  		})
		.then((company) => {
  			return context.commit('SET_COMPANY', company);
  		})
      	.catch((e) => Promise.reject(e));
   	},
   	SAVE_COMPANY: (context, payload) => {
   		return dbs.default.Company.create(payload)
   		.then((acc) => {
   			return context.commit('ADD_COMPANY', acc);
   		})
		.catch(e => {return console.log(e), Promise.reject(e)})
	},
   	UPDATE_COMPANY: (context, payload) => {
   		return dbs.default.Company.update(payload, {
   			where: {
   				id: 1
   			}
   		})
   		.then((updatedComp) => {
	      return context.commit('UPDATE_COMPANY', updatedComp);
	    })
	    .catch(e => Promise.reject(e))
	},
}

export default {
    state, getters, mutations, actions
}