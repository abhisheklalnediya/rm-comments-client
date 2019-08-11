import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Comment } from './comment.contracts';

const API_ROOT = process.env.REACT_APP_API_ROOT

function headers() {
  const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGQzM2QzNTI3Mzk4NmNlZmZlZDRhNiIsIm5hbWUiOiIiLCJlbWFpbCI6InRlc3RAdHQudHQiLCJpYXQiOjE1NjU1MjE1ODQsImV4cCI6MTU2NTUyMjE4NH0.VZijwmavB1C8ZriyirE27Id19qIIpuFmJxT4kmm8KeU";
  return {
    "accept": "application/json",
    "accept-language": "en,en-US;q=0.9,ml;q=0.8",
    "authorization": `Bearer ${token}`
  } as AxiosRequestConfig
}

export function getComments() {
  return new Promise<Comment[]>((resolve, reject) => {
    axios.get(`${API_ROOT}/comments/`).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    })
  })
}

export function newComment(comment: Comment) {
  return new Promise<Comment>((resolve, reject) => {
    axios.post(`${API_ROOT}/comments/`, { ...comment }, { headers: headers() }).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}

export function editComment(comment: Comment) {
  return new Promise<Comment>((resolve, reject) => {
    axios.patch(`${API_ROOT}/comments/${comment.id}/`, { ...comment }, { headers: headers() }).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}