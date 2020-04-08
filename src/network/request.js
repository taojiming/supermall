import axios from 'axios'

//最终方案
export function request(config) {
  //1.创建新的axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/h8',
    timeout:5000
    })
  //2.axios拦截器
  //2.1请求拦截器
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   return config
  // },error => {
  //   console.log(error);
  // })
  //2.2响应拦截器
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },error => {
    console.log(error);
  })
  //3.进行真正的网络请求
    return instance(config)
}

//使用promise
// export function request(config) {
//   return new Promise((resolve,reject) => {
//     //1.创建新的axios实例
//       const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })
//
//     //3.进行真正的网络请求
//     instance(config)
//       .then(res => {
//       resolve(res);
//     }).catch(err => {
//       reject(err);
//     })
//   })
// }

//使用回调函数
// export function request(config,success,failure) { //加入两个回调函数 success,failure
//   //创建axios的局部实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })
//   //发送真正的网络请求
//   instance(config).then(res => {
//     // console.log(res);
//     success(res);
//   }).catch(res => {
//     // console.log(res);
//     failure(res);
//   })
// }


