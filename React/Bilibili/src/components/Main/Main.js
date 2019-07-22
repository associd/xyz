import React from 'react';
import Carousel from './Carousel';
import Reacommend from './Recommend';
// import PrimaryMenu from './PrimaryMenu';
import "./Main.css"

class Main extends React.Component {
  render() {
    return (
      <main className="media-box">
        <div className="chief">
          <Carousel/>
          <Reacommend/>
        </div>
      </main>
    )
  }
}

export default Main;
