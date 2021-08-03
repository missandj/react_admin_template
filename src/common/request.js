import axios from "axios"
import { createBrowserHistory } from "history"
import { message as Message } from "antd"
const history = createBrowserHistory()

export const inst = axios.create({
  baseURL: "api/",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json; charset=UTF8",
    "Access-Control-Allow-Origin": "*",
  },
})

// 添加请求拦截器
inst.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["X-Token"] = localStorage.getItem("login_token") ?? ""
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.error(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
/* code:0代表请求成功1代表失败2代表登陆失效 */
inst.interceptors.response.use(
  function (response) {
    // console.log('response',response)
    // 对响应数据做点什么
    if (response.status == 200) {
      // console.log("response", response)
      const { code, data, msg } = response.data
      if (code == 0) {
        return data
      } else if (code == 1) {
        Message.error({
          content: msg,
          duration: 5,
        })
        return false
      } else if (code == 2) {
        Message.info({
          content: msg,
          duration: 3,
          onClose: () => {
            localStorage.removeItem("login_token")
            history.push("/login")
            window.location.reload()
          },
        })
        return false
      } else {
        if (response.data.errno != null && response.data.errno == 0) {
          return data
        } else {
          Message.info({
            content: msg,
            duration: 5,
          })
          return false
        }
      }
    } else {
      Message.error("响应错误")
      console.error(response)
      return error
    }
  },
  function (error) {
    // 对响应错误做点什么
    Message.error("响应错误")
    console.log(error)
    return error
  }
)
