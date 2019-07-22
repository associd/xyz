import React from 'react';
import "./Carousel.css"

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgs: [
        <li className="img-box" key="1">
          <a href="/">
            <img src="./img/c_1.jpg" alt=""/>
          </a>
        </li>,
        <li className="img-box" key="2">
          <a href="/">
            <img src="./img/c_2.jpg" alt=""/>
          </a>
        </li>,
        <li className="img-box" key="3">
          <a href="/">
            <img src="./img/c_1.jpg" alt=""/>
          </a>
        </li>,
        <li className="img-box" key="4">
          <a href="/">
            <img src="./img/c_3.jpg" alt=""/>
          </a>
        </li>,
        <li className="img-box" key="5">
          <a href="/">
            <img src="./img/c_2.jpg" alt=""/>
          </a>
        </li>,
      ],
      activePosition: 0,
    }
    this.clock()
  }
  render() {
    return (
      <section className="carousel-wraper">
        <ul
          className="carousel flex"
          style={{left: -this.state.activePosition * 440}}
        >
          {this.state.imgs}
        </ul>
      </section>
    )
  }
  clock() {
    setInterval(() => {
      this.setState({
        activePosition: (this.state.activePosition + 1) % this.state.imgs.length
      })
    }, 1500)
  }
}

export default Carousel;
