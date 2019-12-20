import store from '../store'
const appID = 'wxe167dc1911e20130';
export function isweixin() { //判断是否是微信浏览器
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
export function getWXCode(name) { //是否已经获得code
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}
export function getUserCode() { //授权
  var url = encodeURIComponent(window.document.location.href.split('#')[0]);
  if (!getWXCode("code")) {
    location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?appid="+appID+"&redirect_uri=" + url + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
  }
}
export function getShareUserCode() { //你授权
  var url = encodeURIComponent(window.document.location.href.split('#')[0]);
  if (!getWXCode("code")) {
    location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?appid="+appID+"&redirect_uri=" + url + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
  }
}