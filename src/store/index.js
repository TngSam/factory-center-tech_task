import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import {
  MUTATION_AUTHENTICATE_USER,
  MUTATION_UNAUTHENTICATE_USER,
  MUTATION_SET_QUESTIONS,

  LOGIN,
  FETCH_QUESTIONS,
  CREATE_QUESTION
} from './names'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: false,
    questions: []
  },
  mutations: {
    [MUTATION_AUTHENTICATE_USER](state) {
      state.isAuth = true
    },
    [MUTATION_UNAUTHENTICATE_USER](state) {
      state.isAuth = false
    },

    [MUTATION_SET_QUESTIONS](state, payload) {
      state.questions = payload
    }
  },
  actions: {
    async [LOGIN]({ commit }) {
      await Promise.resolve()
      commit(MUTATION_AUTHENTICATE_USER)
    },

    async [FETCH_QUESTIONS]({ commit }) {
      const { data } = await axios.get('https://api.myjson.com/bins/8561o')

      const questions = data.map(async topic => {
        if (topic.url) {
          const question = await axios.get(topic.url)
          return {
            createdAt: topic.createdAt,
            title: topic.title,
            answers: question.data.answers
          }
        }

        return topic
      })

      commit(MUTATION_SET_QUESTIONS, await Promise.all(questions))
    },
    async [CREATE_QUESTION]({ commit, state }, { title }) {
      // dummy checking
      if (title.length < 3) {
        throw new Error('Длина вопроса должна быть больше 2 символов.')
      } else if (state.questions.some(question => question.title === title)) {
        throw new Error('Такой вопрос уже есть.')
      }

      const payload = {
        title,
        createdAt: new Date().toString()
      }
      const { data } = await axios.post('https://api.myjson.com/bins/', payload)

      commit(MUTATION_SET_QUESTIONS, [...state.questions, payload])
      return data
    }
  }
})
