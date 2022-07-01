import request from "../index";
export function getRecommendSong(params: any) {
  return request({
    url: "/artist/list",
    method: "get",
    params,
  });
}

export function getMusicList(params: any) {
  return request({
    url: "/artist/top/song",
    params,
  });
}

export function loginByPhone(params: any) {
  return request({
    url: "/login/cellphone",
    params,
  });
}

export function checkVerifyCode(params: any) {
  return request({
    url: "/captcha/verify",
    params,
  });
}

export function getVerifyCodeByPhone(params: any) {
  return request({
    url: "/captcha/sent",
    params,
  });
}

//搜索

export function search(params: any) {
  return request({
    url: "/search",
    params,
  });
}

//歌曲mv
export function getSongMv(params: any) {
  return request({
    url: "/mv/url",
    params,
  });
}

//mv详情
export function getDetail(params: any) {
  return request({
    url: "/mv/detail",
    params,
  });
}
//mv信息
export function getSongMvDetail(params: any) {
  return request({
    url: "/mv/detail/info",
    params,
  });
}

//评论信息
export function getComment(params: any) {
  return request({
    url: "/comment/mv",
    params,
  });
}
