const getters = {
  // 用户信息
  token: state => state.user.token,
  refreshtoken: state => state.user.refreshtoken,
  calcRes: state => state.calculate.calcRes,
  reportTitle: state => state.calculate.reportTitle,
  requireFullScreen: state => state.app.requireFullScreen,
}
export default getters
