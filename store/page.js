export const state = () => ({
  careerData: {},
  requirementsData: {},
  recommendedContents: {},
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