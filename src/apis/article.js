import { request } from "@/utils";
//  提交文章表单
export function createArticleAPI (data) {
  return request ({
    url: '/mp/articles?draft=false',
    method: 'POST',
    data 
  })
}
export function getChannelAPI () {
  return request ({
    url: '/channels',
    method: 'GET',
  })
}
export function getArticleListAPI (data) {
  return request ({
    url: '/mp/articles',
    method: 'GET',
    data 
  })
}