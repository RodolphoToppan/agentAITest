export const state = () => ({
  pitchbarData: null
});
  
export const mutations = {
  setPitchbar (localState, payload) {
    localState.pitchbarData = payload;
  }
};
