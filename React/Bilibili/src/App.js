import React, {Component} from 'react';
import './App.css';

import Header from './components/Header'
import Carousel from './components/Carousel';
import ZoneWraper from './components/ZoneWraper';
import CardBox from './components/CardBox';
import AnimeCarousel from './components/AnimeCarousel';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    fetch("./data.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }
  render() {
    return (
      <>
        <Header/>
        <main className="media-box">
          <ZoneWraper id="recommend">
            <div className="left">
              <Carousel/>
            </div>
            <div className="right">
              <CardBox data={this.state.data.recommend}/>
            </div>
          </ZoneWraper>
          {/*
            <ZoneWraper id="promotion">
              <div className="left">
                <div className="top">
                  <div className="icon-promotion"></div>
                  <span className="name">推广</span>
                  <a href="/" className="fire">我在B站学习</a>
                </div>
                <CardBox content="promotion" />
              </div>
              <div className="right">

              </div>
            </ZoneWraper>
            */
          }
          <ZoneWraper id="live" left={<CardBox content="live" />}/>
          <ZoneWraper id="xxx" left={<AnimeCarousel /> }/>
        </main>
      </>
    );
  }
}

export default App;
