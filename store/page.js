export const state = () => ({
  careerData: {},
  requirementsData: {},
});

export const mutations = {
  assign(state, value) {
    Object.assign(state, value);
  },
};

export const actions = {
  assign({ commit }, value) {
    commit('assign', value);
  },
};