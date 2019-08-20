import React, {Component} from 'react';
import "./Header.css"

class Header extends Component {
  render() {
    return (
      <header>
        <div className="top">
          <div className="blur-bg mask"></div>
          <div className="mask"></div>
          <div className="nav media-box flex flex-space-between">
            <ul className="left flex">
              <li>
                <a className="home" href="/">
                  <i className="home-icon icon"></i>
                  主站
                </a>
              </li>
              <li><a href="/">音频</a></li>
              <li><a href="/">游戏中心</a></li>
              <li><a href="/">直播</a></li>
              <li><a href="/">会员购</a></li>
              <li><a href="/">漫画</a></li>
              <li><a href="/">BML</a></li>
              <li><a href="/">70年</a></li>
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
              <li><a href="/">大会员</a></li>
              <li><a href="/">消息</a></li>
              <li><a href="/">动态</a></li>
              <li><a href="/">稍后再看</a></li>
              <li><a href="/">收藏</a></li>
              <li><a href="/">历史</a></li>
              <li><a href="/">投稿</a></li>
            </ul>
          </div>
        </div>
        <div className="head-banner">
          <section className="media-box head-content">
            <p className="head-title">BML直播间向你发来连接邀请</p>
            <div className="search flex">
              <a href="/" className="btn link-ranking-button">
                <span className="with-background-icon">排行榜</span>
              </a>
              <div className="searchForm flex">
                <input placeholder="BML直播" type="text"/>
                <button className="search-icon" type="submit"></button>
              </div>
            </div>
          </section>
          <a href="/" className="banner-link"> </a>
        </div>
        <ul className="primary-menu flex flex-space-between media-box">
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="home"></div>
              首页
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              动画
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              番剧
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              国创
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              音乐
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              舞蹈
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              游戏
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              科技
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              数码
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              生活
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              鬼畜
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              时尚
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              广告
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              娱乐
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              影视
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="count">
                <span>999+</span>
              </div>
              放映厅
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="featrue"></div>
              专栏
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="plaza"></div>
              广场
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="plaza"></div>
              直播
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="black-house"></div>
              小黑屋
            </a>
          </li>
          <li className="flex flex-align-item-center">
            <a href="/" className="menu-content">
              <div className="plaza"></div>
              <img src="" alt=""/>
            </a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header
