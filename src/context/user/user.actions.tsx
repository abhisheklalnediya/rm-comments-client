import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { User, Token } from './user.contracts';

const API_ROOT = process.env.REACT_APP_API_ROOT

function headers() {
  const token = localStorage.getItem("token")
  return {
    "accept": "application/json",
    "accept-language": "en,en-US;q=0.9,ml;q=0.8",
    "authorization": `Bearer ${token}`
  } as AxiosRequestConfig
}

export function onAuthFail(cb: Function) {
  console.log('Brrr')
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      cb()
    }
    return error;
  });
}

export function login(d: User) {
  return new Promise<Token>((resolve, reject) => {
    axios.post(`${API_ROOT}/users/login`, d).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    }).catch(e => {
      try {
        reject(e.response.data.error)
      } catch {
        reject(e)
      }
    })
  })
}

export function signUp(d: User) {
  return new Promise<Comment[]>((resolve, reject) => {
    axios.post(`${API_ROOT}/users`, d).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    }).catch(e => {
      try {
        reject(e.response.data.error)
      } catch {
        reject(e)
      }
    })
  })
}

export function whoAmI() {
  return new Promise<User>((resolve, reject) => {
    axios.get(`${API_ROOT}/users/me`, { headers: headers() }).then((respose: AxiosResponse) => {
      const { data } = respose
      console.log(data)
      resolve(data)
    }).catch(e => {
      try {
        reject(e.response.data.error)
      } catch {
        reject(e)
      }
    })
  })
}
