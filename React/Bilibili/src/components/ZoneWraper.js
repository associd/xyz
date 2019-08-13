import React, {Component} from 'react';
import "./ZoneWraper.css"

class ZoneWraper extends Component {
  render() {
    return (
      <section className={`${this.props.className ? this.props.className : ""} zone-wraper`}>
        <div className="left">
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
