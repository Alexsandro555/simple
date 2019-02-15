import { ACTIONS } from "@product/constants"
import { api } from "@product/api/Attribute"
import { api as globalApi } from "@/api/main"

export default {
  [ACTIONS.ATTRIBUTES]: ({ commit, state }, id) => {
    globalApi.get(state.url+'/'+id).then(response => {
        commit('SET_ARRAY_VARIABLE', {variable: 'productAttributes', value: response})
      }).catch(error => {
        reject(error)
      })
  },
  [ACTIONS.LOAD_BINDING_ATTRIBUTES]: ({commit, state}) => {
    globalApi.get(state.url+'/bindings').then(response => {
      commit('SET_ARRAY_VARIABLE', {variable: 'bindAttributes', value: response})
    })
  },
  [ACTIONS.SAVE_BINDINGS]: ({commit, state}, data) => {
    api.saveBindings(data).then(response => {
      commit('SET_ARRAY_VARIABLE', {variable: 'bindAttributes', value: response})
    })
  },
  [ACTIONS.REMOVE_BIND_ATTRIBUTES]: ({commit, state}, data) => {
    api.removeBindyAttributes(data).then(response =>{

    })
  },
  [ACTIONS.SAVE_DATA]: ({commit, dispatch, state}, data) => {
    api.save(state.url+'/save', data).then(response => {
      dispatch('successSaveNotification', response.message, {root: true})
    })
  }
}