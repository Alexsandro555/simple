import module_actions from './actions.js'
import standart_actions from '@/vuex/actions.js'
import module_mutations from './mutations.js'
import standart_mutations from '@/vuex/mutations.js'
import module_getters from './getters.js'
import standart_getters from '@/vuex/getters'

var actions = Object.assign({}, module_actions, standart_actions)
var getters = Object.assign({}, module_getters, standart_getters)
var mutations = Object.assign({}, module_mutations, standart_mutations)

const state = {
  name: 'ProductCategory',
  items: [],
  init: true,
  needFields: true,
  loading: true,
  item: {},
  url: 'product-category',
  fields: [],
  typeFiles: ['image-type-product'],
  model: 'Modules\\Product\\Entities\\ProductCategory'
}

const module = {
  namespaced: true,
  init: true,
  state,
  getters,
  mutations,
  actions
}

export default module;

