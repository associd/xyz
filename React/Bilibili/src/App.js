import React from 'react';
import './App.css';

import Nav from './components/Nav';
import Search from './components/Search';
import PrimaryMenu from './components/PrimaryMenu';

import Carousel from './components/Carousel';
import Reacommend from './components/Recommend';

import ZoneWraper from './components/ZoneWraper';
import CardBox from './components/CardBox';

function App() {
  return (
    <>
      <header>
        <div className="top">
          <div className="blur-bg mask"></div>
          <div className="mask"></div>
          <Nav/>
        </div>
        <div className="head-banner">
          <section className="media-box head-content">
            <p className="head-title">BML直播间向你发来连接邀请</p>
            <Search/>
          </section>
          <a href="/" className="banner-link"></a>
        </div>
        <PrimaryMenu></PrimaryMenu>
      </header>
      <main className="media-box">
        <div className="chief-recommend flex">
          <Carousel/>
          <Reacommend/>
        </div>
        <ZoneWraper id="live" left={<CardBox/>}/>
      </main>
    </>
  );
}

export default App;
