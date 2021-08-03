import React, { Component } from "react"
import { Tag, Space } from "antd"

export default class NineModules extends Component {
  render() {
    return (
      <div className="nineModules">
        <span className="smallTitle">{this.props.children}</span>
        <Space>
          {this.props.modulesList &&
            this.props.modulesList.map((item, index) => {
              return (
                <Tag
                  key={index}
                  color={item.active ? "blue" : ""}
                  onClick={this.tagClick.bind(this, {
                    id: item.id,
                    isReadOnly: this.props.isReadOnly,
                  })}
                >
                  {item.name}
                </Tag>
              )
            })}
        </Space>
      </div>
    )
  }

  componentDidMount() {
    // console.log("props", this.props)
  }
  tagClick = (obj) => {
    if (obj.isReadOnly) {
      //可切换
      this.props.data(obj.id)
    }
  }
}
