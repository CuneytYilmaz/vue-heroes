import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared/data-service';
import { GET_HEROES, ADD_HERO, UPDATE_HERO, DELETE_HERO } from './mutation-types';

Vue.use(Vuex)

const state = { 
  heroes: [],
};

const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes = state.heroes.push(hero);
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(h => h.id === hero.id);
    state.heroes.splice(index, 1, hero);
    state.heroes = [...state.heroes];
  },
  [DELETE_HERO](state, heroId) {
    state.heroes = [...state.heroes.filter(h => h.id !== heroId)];
  }
};

const actions = {
  // actions let us get to context which contains
  // { state, getters, commit, dispatch }
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async addHeroAction({ commit }, hero) {
    const addedHero = await dataService.addHero(hero);
    commit(ADD_HERO, addedHero);
  },
  async updateHeroAction({ commit }, hero) {
    const updatedHero = await dataService.updateHero(hero);
    commit(UPDATE_HERO, updatedHero);
  },
  async deleteHeroAction({ commit }, hero) {
    const deletedHeroId = await dataService.deleteHero(hero);
    commit(DELETE_HERO, deletedHeroId);
  }
};
const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
})
