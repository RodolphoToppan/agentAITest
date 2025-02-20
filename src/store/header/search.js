export default {
  namespaced: true,
  state: () => ({
    showSearch: false,
    dataSearch: null,
    submit: false
  }),
  mutations: {
    toggleSearch (localState, payload) {
      localState.showSearch = payload;
    },
    changeDataSearch (localState, payload) {
      localState.dataSearch = payload;
    },
    isSubmit (localState, payload) {
      localState.submit = payload;
    }
  }
};
