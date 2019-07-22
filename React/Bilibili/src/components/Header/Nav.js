import React from "react"
import "./nav.css"

class Nav extends React.Component {
  render() {
    return (
      <div className="nav media-box flex flex-space-between">
        <ul className="left flex">
          <li>
            <a className="home" href="/">
              <i className="home-icon icon"></i>
              主站
            </a>
          </li>
          <li>
            <a href="/">音频</a>
          </li>
          <li>
            <a href="/">游戏中心</a>
          </li>
          <li>
            <a href="/">直播</a>
          </li>
          <li>
            <a href="/">会员购</a>
          </li>
          <li>
            <a href="/">漫画</a>
          </li>
          <li>
            <a href="/">BML</a>
          </li>
          <li>
            <a href="/">70年</a>
          </li>
          <li>
            <a className="app" href="/">
              <i className="app-icon icon"></i>
              下载APP
            </a>
          </li>
        </ul>
        <ul className="right flex">
          <li className="avatar">
            <a className="face" href="/">
              <img src="./img/logo.svg" width="32" height="32" alt=""/>
            </a>
          </li>
          <li>
            <a href="/">大会员</a>
          </li>
          <li>
            <a href="/">消息</a>
          </li>
          <li>
            <a href="/">动态</a>
          </li>
          <li>
            <a href="/">稍后再看</a>
          </li>
          <li>
            <a href="/">收藏</a>
          </li>
          <li>
            <a href="/">历史</a>
          </li>
          <li>
            <a href="/">投稿</a>
          </li>
        </ul>
      </div>
    )
  }
}
export default Nav;
