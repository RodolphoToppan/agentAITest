import search from './header/search';

export const modules = {
  search
};

export const state = () => ({
  config: null,
  maintenancePage: false,
  user: null
});

export const mutations = {
  setMaintenancePage (state, value) {
    state.maintenancePage = value;
  },
  setConfig (localState, payload) {
    localState.config = payload;
  },
  setUser (localState, payload) {
    localState.user = payload;
  }
};
