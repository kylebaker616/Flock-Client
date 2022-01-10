import apiUrl from '../apiConfig'
import axios from 'axios'

export const createPost = (post, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/posts',
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: {
        title: post.title,
        description: post.description,
        price: post.price,
        language: user.language
      }
    }
  })
}

export const getPosts = (user) => {
  return axios({
    url: apiUrl + '/posts',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
