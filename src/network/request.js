import axios from 'axios'
export function request(config) {

  //1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3',
    timeout: 8000
  })
  //2.axios拦截器
  //请求拦截
  instance.interceptors.request.use((config) =>{
    return config
  },err =>{
    //return err.data
  })
  //响应拦截
  instance.interceptors.response.use((res) =>{
    return res.data
  },err => {
    console.log(err);
  })

  //3.发送正真的请求
  return instance(config)
}
