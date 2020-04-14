const dbs = require('../../models');

const state = {
	categories: null,
}

const getters = {
	CATEGORIES: state => {
		return state.categories
	}
}

const mutations = {
	SET_CATEGORY: (state, payload) => {
		state.categories = payload;
	},

	ADD_CATEGORY: (state, payload) => {
		state.categories.push(payload)
	},
  UPDATE_CATEGORY: (state, payload) => {
    state.categories[state.categories.findIndex(c => c.ID == payload.ID)] = payload;
  },
  DELETE_CATEGORY: (state, id) => {
    state.categories.splice(state.categories.findIndex(c => c.ID == id), 1);
  },
}

const actions = {
	GET_CATEGORY: (context) => {
		return dbs.default.ProductCategory.findAll({
			raw: true
		})
    .then((categories) => {
			context.commit('SET_CATEGORY', categories);
			return categories;
		})
    .catch(e => Promise.reject(e));
  },

 	SAVE_CATEGORY: (context, payload) => {
 		return dbs.default.ProductCategory.create(payload)
 		.then((pc) => {
 			context.commit('ADD_CATEGORY', pc);
 			return pc;
 		})
		.catch(e => Promise.reject(e))
  },

  UPDATE_CATEGORY: (context, payload) => {
    return dbs.default.ProductCategory.update(payload, {
      where: {
        ID: payload.ID
      }
    })
    .then(() => {
      return dbs.default.ProductCategory.findByPk(payload.ID, {raw: true})
    })
    .then((updatedPC) => {
      return context.commit('UPDATE_CATEGORY', updatedPC);
    })
    .catch(e => Promise.reject(e))
  },

  DELETE_CATEGORY: (context, ID) => {
    return dbs.default.ProductCategory.findByPk(ID)
    .then((pc) => {
      return pc.countProducts()
    })
    .then((c) => {
      if (c > 0)
        return Promise.reject(new Error('It has products'))
      else 
        return dbs.default.ProductCategory.destroy({where: {ID}})
    })
    .then(() => {
      return context.commit('DELETE_CATEGORY', ID);
    })
    .catch(e => Promise.reject(e))
  },
}

export default {
    state, getters, mutations, actions
}