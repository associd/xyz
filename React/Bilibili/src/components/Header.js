import React from 'react';
import Nav from './Nav';
import Search from './Search';
import PrimaryMenu from './PrimaryMenu';
import "./header.css"

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="top">
          <div className="blur-bg"></div>
          <div className="mask"></div>
          <Nav/>
        </div>
        <div className="head-banner">
          <section className="media-box head-content">
            <p className="head-title">BML直播间向你发来连接邀请</p>
            <Search/>
          </section>
          <a href="#" className="banner-link"></a>
        </div>
        <PrimaryMenu></PrimaryMenu>
      </header>
    )
  }
}

export default Header;
