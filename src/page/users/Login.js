import React, { Component } from "react"
import { Button, Input, message } from "antd"
import { inst } from "common/request"
import { api } from "common/api"
import * as y from "utils/methods"
import { isNull } from "utils/isNull.js"
import userImg from "assets/user.jpeg"
import "./css/login.css"

export default class Login extends Component {
  state = {
    loginName: "admin",
    password: "123456",
  }
  render() {
    const { loginName, password } = this.state
    return (
      <div className="common_view login_view">
        <div className="float_left left_view"></div>
        <div className="float_right right_view">
          <div>
            <div className="container_box">
              <img src={userImg} className="login_img" />
            </div>
            <h1 className="container_box">习惯公社后台业务管理系统</h1>
            <div className="container_box from_view">
              <Input
                className="input_css"
                placeholder="请输入账号"
                maxLength={16}
                size="middle"
                value={loginName}
                name="loginName"
                onChange={this.inputChange}
              />
              <Input
                className="input_css"
                placeholder="请输入密码"
                maxLength={16}
                size="middle"
                value={password}
                name="password"
                onChange={this.inputChange}
              />
              <Button type="primary" onClick={this.login}>
                登录
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.init()
  }
  componentWillUnmount() {
    clearTimeout(window.lazy)
  }
  init = () => {
    const isLogin = localStorage.getItem("login_token")
    if (isLogin) {
      this.props.history.push("/home")
    }
  }
  inputChange = (e) => {
    const { name } = e.target
    this.setState({
      [name]: e.target.value,
    })
  }
  login = () => {
    if (window.lazy) {
      window.clearTimeout(window.lazy)
    }
    window.lazy = window.setTimeout(async () => {
      const { loginName, password } = this.state
      let arr = [
        { data: loginName, title: "登录账号不能为空" },
        { data: password, title: "登录密码不能为空" },
      ]
      const isgo = y.stopToApi(arr)
      if (!isgo) {
        return
      }
      // const res = await inst({
      //   url: api.login,
      // })
      // if (res) {
      //   this.setState({})
      // }
      localStorage.setItem("login_token", "46f5c0aa07ce883a3d69c7f22f1da942")
      this.props.history.push("/")
    }, 1000)
  }
}
