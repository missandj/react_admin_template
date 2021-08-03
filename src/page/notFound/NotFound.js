import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import "./NotFound.css"
import Notimg from "assets/notfound.png"

export default class NotFound extends Component {
  render() {
    return (
      <div className="notfound">
        <div className="view">
          <img src={Notimg} />
          <div>很抱歉，您要查找的页面找不到</div>
          <br />
          <NavLink to="/">去首页～</NavLink>
        </div>
      </div>
    )
  }
}
