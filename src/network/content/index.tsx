import request from "../index";
export function getHotSinger() {
  return request({
    url: "/top/artists",
    method: "get",
  });
}

export function getSingerMusic(params: any) {
  return request({
    url: "/artist/songs",
    method: "get",
    params,
  });
}

//播放歌曲
export function getMusicUrl(params: any) {
  return request({
    url: "/song/url",
    method: "get",
    params,
  })
}