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
            <li>主站 </li>
            <li>音频</li>
            <li>游戏中心直播</li>
            <li>会员购 </li>
            <li>漫画</li>
            <li>BML </li>
            <li>70年 </li>
            <li>下载APP</li>
          </ul>
          <ul className="right flex">
            <li className="avatar"></li>
            <li>大会员</li>
            <li>消息</li>
            <li>动态</li>
            <li>稍后再看</li>
            <li>收藏</li>
            <li>历史</li>
            <li>投稿</li>
          </ul>
        </div>
      </section>
    )
  }
}
export default Top;
