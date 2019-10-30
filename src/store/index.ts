import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    points: 0
  },
  mutations: {
    addQuestions: (state, questions) => {
      state.questions = questions;
      state.points = 0;
    },
    addPoints: (state, points) => {
      state.points += points;
    }
  },
  actions: {
    addQuestions: ({ commit }, questions) => {
      commit('addQuestions', questions);
    },
    addPoints: ({ commit }, points) => {
      console.log(points);
      commit('addPoints', points);
    }
  },
  modules: {}
});
