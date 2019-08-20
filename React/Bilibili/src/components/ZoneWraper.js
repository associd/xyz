import React, {Component} from 'react';
import "./ZoneWraper.css"

class ZoneWraper extends Component {
  constructor(props) {
    super(props)
    this.dom = {
      top: {
        promotion: (
          <div className="top flex item-bottom">
            <div className="icon-promotion"></div>
            <span className="name">推广</span>
            <a href="/" className="fire">我在B站学习</a>
          </div>
        )
      }
    }
  }
  render() {
    return (
      <section id={this.props.id} className={`${this.props.className ? this.props.className + " " : ""}zone-wraper flex`}>
        <div className="left">
          {this.dom.top[this.props.id]}
          {this.props.left}
        </div>
        <div className="right">
          {this.props.right}
        </div>
      </section>
    )
  }
}

export default ZoneWraper
