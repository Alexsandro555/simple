import {PRIVATE, GLOBAL} from '@/constants.js'
import { api } from '@/api/main.js'

export default {
  [GLOBAL.INITIALIZATION] : ({ state, dispatch, commit }) => {
    api.get('/initializer/fields/'+state.name).then(response => {
      commit('SET_ARRAY_VARIABLE', {variable: 'fields', value: response})
    })
  },
  [GLOBAL.LOAD]: ({commit, state}) => {
    api.get(state.url).then(response => {
      commit('SET_ARRAY_VARIABLE', {variable: 'items', value: response})
      commit('SET_VARIABLE',{variable: 'loading', value: false})
    })
  },
  [GLOBAL.ADD]: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      api.create(state.url, data).then(response => {
        const exist =  state.items.find(item => item.id == response.id)
        if(!exist) commit(PRIVATE.ADD, response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [GLOBAL.UPDATE_ITEM]: ({commit}, objField) => {
    commit('SET_VARIABLE',{module: ''})
  },
  [GLOBAL.DELETE]: ({ commit, state }, id) => {
    api.delete({url: state.url, id})
      .then(response => {
        commit(PRIVATE.DELETE, response)
      })
  },
  [GLOBAL.SAVE_DATA]: ({ commit, dispatch, state }, data) => {
    return new Promise((resolve, reject) => {
      api.patch({data, url: state.url}).then(response => {
        dispatch('successSaveNotification', response.message, {root: true})
        const isUpdated = state.items.find(item => item.id == response.id)
        if (isUpdated) {
          commit(GLOBAL.UPDATE, response)
        } else {
          commit(PRIVATE.ADD, response)
        }
        resolve(response)
      })
    }).catch(error => {
      reject(error)
    })
  }
}