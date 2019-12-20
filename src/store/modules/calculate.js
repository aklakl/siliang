const calculate = {
  state: {
    calcRes: Object,
  },

  mutations: {
    CALC_RES: (state, res) => {
      state.calcRes = res
    },
  }
}

export default calculate

