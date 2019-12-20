const getters = {
  // 用户信息
  token: state => state.user.token,
  refreshtoken: state => state.user.refreshtoken,
  calcRes: state => state.calculate.calcRes,
}
export default getters
