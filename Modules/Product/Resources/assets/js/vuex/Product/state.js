import module_actions from './actions'
import standart_actions from '@/vuex/actions'
import module_mutations from './mutations'
import standart_mutations from '@/vuex/mutations'
import module_getters from './getters.js'
import standart_getters from '@/vuex/getters'

var actions = Object.assign({}, module_actions, standart_actions)
var getters = Object.assign({}, module_getters, standart_getters)
var mutations = Object.assign({}, module_mutations, standart_mutations)

const state = {
  name: 'Product',
  items: [],
  item: {},
  url: 'product',
  loading: true,
  fields: [],
  init: true,
  typeFiles: ['image-product'],
  model: 'Modules\\Product\\Entities\\Product'
}

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module;

