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
export function delArticleAPI (id) {
  return request ({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  })
}
export function getArticleListAPI (params) {
  return request ({
    url: '/mp/articles',
    method: 'GET',
    params 
  })
}
export function getArticleById (id) {
  return request ({
    url: `/mp/articles/${id}`,
    method: 'GET',
  })
}
export function updateArticleAPI (data) {
  return request ({
    url: `/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}