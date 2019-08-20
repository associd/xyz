import React from 'react';
import './App.css';

import Header from './components/Header'
import Carousel from './components/Carousel';
import ZoneWraper from './components/ZoneWraper';
import CardBox from './components/CardBox';
import AnimeCarousel from './components/AnimeCarousel';

function App() {
  return (
    <>
      <Header/>
      <main className="media-box">
        <ZoneWraper id="recommend" className="chief-recommend flex" left={<Carousel/>} right={ <CardBox content={"recommend"} />}/>
        <ZoneWraper id="promotion" className="promotion" left={<CardBox content={"promotion"} />}/>
        <ZoneWraper id="live" left={<CardBox content={"live"} />}/>
        <ZoneWraper id="xxx" left={<AnimeCarousel /> }/>
      </main>
    </>
  );
}

export default App;
