import React from "react"
import "./top.css"

class Top extends React.Component {
  render() {
    return (
      <section className="app-top">
        <div className="blur-bg"></div>
        <div className="mask"></div>
        <div className="nav flex flex-space-between">
          <ul className="left flex">
            <li>
              <a href="#">主站</a>
            </li>
            <li>
              <a href="#">音频</a>
            </li>
            <li>
              <a href="#">游戏中心直播</a>
            </li>
            <li>
              <a href="#">会员购</a>
            </li>
            <li>
              <a href="#">漫画</a>
            </li>
            <li>
              <a href="#">BML</a>
            </li>
            <li>
              <a href="#">70年</a>
            </li>
            <li>
              <a href="#">下载APP</a>
            </li>
          </ul>
          <ul className="right flex">
            <li className="avatar">
              <a href="#"></a>
            </li>
            <li>
              <a href="#">大会员</a>
            </li>
            <li>
              <a href="#">消息</a>
            </li>
            <li>
              <a href="#">动态</a>
            </li>
            <li>
              <a href="#">稍后再看</a>
            </li>
            <li>
              <a href="#">收藏</a>
            </li>
            <li>
              <a href="#">历史</a>
            </li>
            <li>
              <a href="#">投稿</a>
            </li>
          </ul>
        </div>
      </section>
    )
  }
}
export default Top;
