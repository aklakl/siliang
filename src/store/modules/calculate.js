const calculate = {
  state: {
    calcRes: Object,
    reportTitle : Object,
  },

  mutations: {
    CALC_RES: (state, res) => {
      state.calcRes = res
    },
    REPORT_TITLE: (state, res) => {
      state.reportTitle = res
    },
  }
}

export default calculate

