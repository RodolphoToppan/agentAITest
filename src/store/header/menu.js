export const state = () => ({
  menuData: null,
  menuOpen: false,
  menuLoaded: false
});

export const mutations = {
  setMenu (localState, payload) {
    localState.menuData = payload;
  },
  toggleMenu (localState, payload) {
    localState.menuOpen = payload !== undefined ? payload : !localState.menuOpen;
  },
  loadMenu (localState) {
    localState.menuLoaded = true;
  }
};
