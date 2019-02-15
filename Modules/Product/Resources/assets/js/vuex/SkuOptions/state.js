import module_actions from './actions.js'
import standart_actions from '@/vuex/actions.js'
import module_mutations from './mutations.js'
import standart_mutations from '@/vuex/mutations.js'
import module_getters from './getters.js'
import standart_getters from '@/vuex/getters'

var actions=Object.assign({}, module_actions, standart_actions)
var getters=Object.assign({}, module_getters, standart_getters)
var mutations = Object.assign({}, module_mutations, standart_mutations)

const state = {
    name: 'SkuOptions',
    items: [],
    item: {},
    url: 'sku-options',
    init: true,
    fields: [],
    loading: true,
    needFields: false,
    model: 'Modules\\Product\\Entities\\SkuOptions'
}

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default module;

