import request from "../index";
export function getHotSinger() {
  return request({
    url: "/top/artists",
    method: "get",
  });
}

export function getSingerMuisc(params: any) {
  return request({
    url: "/artist/songs",
    method: "get",
    params,
  });
}
