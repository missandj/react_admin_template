import React, { Component } from "react"
import { Switch } from "react-router-dom"
import { Layout, Breadcrumb, Space, Button } from "antd"
import NestingAuth from "NestingAuth"
import NestingRoute from "NestingRoute"
import logo from "assets/logo.png"
import userImg from "assets/user.jpeg"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
} from "@ant-design/icons"
import MenuView from "component/menu/Menu"
import "./css/home.css"
import { isNull } from "utils/isNull"

const { Header, Sider, Content } = Layout

export default class Home extends Component {
  state = {
    collapsed: false,
    menuKey: "", //当前路径name
    keyPath: null, //路径数组
    contentMarginLeft: 200,
  }
  render() {
    return (
      <Layout className="common_view">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo_view">
            <img src={logo} className="logoImg" alt="logo" />
            {!this.state.collapsed && <i>习惯公社</i>}
          </div>
          <MenuView data={this.getMenuKey}></MenuView>
        </Sider>
        <Layout className="site-layout">
          <Header className="menu_header clearfix">
            <div className="float_left">
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
            </div>
            <div className="float_right">
              <Space size="large">
                <img src={userImg} className="user_img " />
                <span>name</span>
                <Button onClick={this.outLogin}>退出</Button>
              </Space>
            </div>
          </Header>
          <Content className="menu_content">
            <div>
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                {this.state.chineseKeyPath && this.state.chineseKeyPath ? (
                  this.state.chineseKeyPath.map((item, index) => {
                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                  })
                ) : (
                  <>
                    {/* <Breadcrumb.Item key={1}>学</Breadcrumb.Item>
                    <Breadcrumb.Item key={2}>家长学堂</Breadcrumb.Item>
                    <Breadcrumb.Item key={3}>公开课</Breadcrumb.Item> */}
                  </>
                )}
              </Breadcrumb>
            </div>
            <div>
              <Switch>
                <NestingAuth routerConfig={NestingRoute} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
  componentDidMount() {}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  getMenuKey = (data) => {
    // console.log("data", data)
    this.setState(
      {
        menuKey: data.menuKey,
        keyPath: data.keyPath,
      },
      () => {
        let title = ""
        NestingRoute.forEach((item) => {
          if (item.name == this.state.menuKey) {
            title = item.title
            this.state.keyPath[0] = title
          }
        })
        this.setState({
          chineseKeyPath: this.state.keyPath.reverse(),
        })
      }
    )
  }
  outLogin = () => {
    localStorage.removeItem("login_token")
    this.props.history.push("/login")
  }
}
