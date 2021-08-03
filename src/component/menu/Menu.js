import React, { Component } from "react"
import { NavLink as Link, withRouter } from "react-router-dom"
import { Menu } from "antd"
import {
  UserDeleteOutlined,
  TagOutlined,
  ScheduleOutlined,
} from "@ant-design/icons"
const { SubMenu } = Menu

const menuList = [
  {
    key: "学",
    title: "学",
    icon: <UserDeleteOutlined />,
    children: [
      {
        key: "家长学堂",
        title: "家长学堂",
        children: [
          {
            key: "openClass",
            path: "/home/openClass",
            title: "公开课",
          },
          {
            key: "memberClass",
            path: "/home/memberClass",
            title: "会员课",
          },
          {
            key: "boutique",
            path: "/home/boutique",
            title: "精品课",
          },
          {
            key: "expertDiscussion",
            path: "/home/expertDiscussion",
            title: "专家坐谈",
          },
          {
            key: "boutiqueDetails",
            path: "/home/boutiqueDetails",
            title: "  精品详情",
          },
        ],
      },
      {
        key: "parentsTraining",
        path: "/home/parentsTraining",
        title: "家长教练营",
      },
      {
        key: "specialTraining",
        path: "/home/specialTraining",
        title: "特训营",
      },
      {
        key: "schoolProgramme",
        path: "/home/schoolProgramme",
        title: "校本方案",
      },
      {
        key: "年级方案",
        title: "年级方案",
        children: [
          {
            key: "expertplan",
            path: "/home/expertplan",
            title: "专家组计划",
          },
          {
            key: "gradePlan",
            path: "/home/gradePlan",
            title: "年级方案",
          },
        ],
      },
      {
        key: "hotspot",
        path: "/home/hotspot",
        title: "热点",
      },
      {
        key: "私教",
        title: "私教",
        children: [
          {
            key: "customScheme",
            path: "/home/customScheme",
            title: "自定义方案",
          },
          {
            key: "selfSelectScheme",
            path: "/home/selfSelectScheme",
            title: "自选方案",
          },
          {
            key: "evaluationScheme",
            path: "/home/selfSelectScheme",
            title: "测评生成方案",
          },
        ],
      },
      {
        key: "evaluation",
        path: "/home/evaluation",
        title: "测评",
      },
      {
        key: "expertSitTalk",
        path: "/home/expertSitTalk",
        title: "专家坐谈",
      },
      {
        key: "activity",
        path: "/home/activity",
        title: "活动",
      },
      {
        key: "banner",
        path: "/home/banner",
        title: "上传海报",
      },
      {
        key: "subject",
        path: "/home/subject",
        title: "上传题目",
      },
    ],
  },
  {
    key: "惠",
    title: "惠",
    icon: <TagOutlined />,
    children: [
      {
        key: "benefit",
        path: "/home/benefit",
        title: "惠",
      },
    ],
  },
  {
    key: "习",
    title: "习",
    icon: <ScheduleOutlined />,
    children: [
      {
        key: "xi",
        path: "/home/xi",
        title: "单习惯",
      },
    ],
  },
]

class MenuView extends Component {
  state = {
    menuKey: "",
    keyPath: [],
  }
  render() {
    return (
      <>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={this.getSelectKey}
          defaultOpenKeys={this.getOpenkey}
          onClick={this.handleClick}
        >
          <SubMenu key="学" icon={<UserDeleteOutlined />} title="学">
            <SubMenu key="家长学堂" title="家长学堂">
              <Menu.Item key="openClass">
                <Link to="/home/openClass">公开课</Link>
              </Menu.Item>
              <Menu.Item key="memberClass">
                <Link to="/home/memberClass">会员课</Link>
              </Menu.Item>
              <Menu.Item key="boutique">
                <Link to="/home/boutique">精品课</Link>
              </Menu.Item>
              <Menu.Item key="expertDiscussion">
                <Link to="/home/expertDiscussion">专家坐谈</Link>
              </Menu.Item>
              <Menu.Item key="boutiqueDetails">
                <Link to="/home/boutiqueDetails">精品详情</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="parentsTraining">
              <Link to="/home/parentsTraining">家长教练营</Link>
            </Menu.Item>
            <Menu.Item key="specialTraining">
              <Link to="/home/specialTraining">特训营</Link>
            </Menu.Item>

            <Menu.Item key="schoolProgramme">
              <Link to="/home/schoolProgramme">校本方案</Link>
            </Menu.Item>

            <SubMenu key="年级方案" title="年级方案">
              <Menu.Item key="expertplan">
                <Link to="/home/expertplan">专家组计划</Link>
              </Menu.Item>
              <Menu.Item key="gradePlan">
                <Link to="/home/gradePlan">年级方案</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="hotspot">
              <Link to="/home/hotspot">热点</Link>
            </Menu.Item>

            <SubMenu key="私教" title="私教">
              <Menu.Item key="customScheme">
                <Link to="/home/customScheme">自定义方案</Link>
              </Menu.Item>
              <Menu.Item key="selfSelectScheme">
                <Link to="/home/selfSelectScheme">自选方案</Link>
              </Menu.Item>
              <Menu.Item key="evaluationScheme">
                <Link to="/home/evaluationScheme">测评生成方案</Link>
              </Menu.Item>
            </SubMenu>

            {/* <Menu.Item key="evaluation">
              <Link to="/home/evaluation">测评</Link>
            </Menu.Item> */}
            <Menu.Item key="subject">
              <Link to="/home/subject">测评</Link>
            </Menu.Item>

            <Menu.Item key="expertSitTalk">
              <Link to="/home/expertSitTalk">专家坐谈</Link>
            </Menu.Item>
            <Menu.Item key="activity">
              <Link to="/home/activity">活动</Link>
            </Menu.Item>
            <Menu.Item key="banner">
              <Link to="/home/banner">上传海报</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="惠" icon={<TagOutlined />} title="惠">
            <Menu.Item key="benefit">
              <Link to="/home/benefit">惠</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="习" icon={<ScheduleOutlined />} title="习">
            <Menu.Item key="xi">
              <Link to="/home/xi">单习惯</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </>
    )
  }
  componentDidMount() {}

  getSelectKey = () => {
    // console.log("this.props", this.props)
    let currentUrl = []
    let localtionUrl = this.props.location.pathname
    if (localtionUrl.split("/home/").length == 2) {
      currentUrl = [localtionUrl.split("/home/")[1]]
      return currentUrl
    } else {
      return ["openClass"]
    }
  }

  getOpenkey = () => {
    let currentUrl = []
    let localtionUrl = this.props.location.pathname

    if (localtionUrl.split("/home/").length == 2) {
      let nowUrl = localtionUrl.split("/home/")[1]
      // console.log(nowUrl, "当前路径")
      /* 获得默认展开key */
      menuList.forEach((item1) => {
        item1.children.forEach((item2) => {
          if (item2.key == nowUrl) {
            currentUrl = [item1.title, item2.title]
            // console.log("1---------------", currentUrl)
          } else {
            item2.children &&
              item2.children.forEach((item3) => {
                if (item3.key == nowUrl) {
                  currentUrl = [item1.title, item2.title]
                  // console.log("2---------------", currentUrl)
                }
              })
          }
        })
      })
      return currentUrl
    } else {
      currentUrl = ["学", "家长学堂"]
      // console.log("3---------------", currentUrl)
      return currentUrl
    }
  }

  handleClick = (e) => {
    // console.log("menu", e)
    this.setState(
      {
        menuKey: e.key,
        keyPath: e.keyPath,
      },
      () => {
        this.props.data({
          menuKey: this.state.menuKey,
          keyPath: this.state.keyPath,
        })
      }
    )
  }
}

export default withRouter(MenuView)
