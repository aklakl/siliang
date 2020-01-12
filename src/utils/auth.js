// import Cookies from 'js-cookie'
export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}
export function setToken(token) {
  return localStorage.setItem('token', token)
}
export function getrefreshToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('fresh-token')
}
export function setrefreshToken(token) {
  return localStorage.setItem('fresh-token', token)
}

export function checkToken(){
  let token = getToken();
  //console.log("checkToken token="+token);
  if (token == undefined ||token=="" || token == null){
    return false;
  }else{
    return true;
  }
}

var auth = {};
auth.getToken = getToken;
auth.setToken = setToken;
auth.getrefreshToken = getrefreshToken;
auth.setrefreshToken = setrefreshToken;
auth.checkToken = checkToken;
export default auth;