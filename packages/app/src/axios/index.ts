import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface RsponseData<T> {
  code: number;
  message: string;
  data: T;
}

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const get = <T>(url: string, params?: AxiosRequestConfig): Promise<RsponseData<T>> => new Promise((resolve, reject) => {
  request(url, {
    method: 'GET',
    ...params,
  }).then(res => {
    const resData = res.data;
    const { code } = resData;
    switch (code) {
      case 200:
        resolve(resData) 
        break;
      default:
        reject(resData)
    }
  }).catch(err => {
    reject(err)
  })
})

export default {
  get,
};