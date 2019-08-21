import React, {Component} from 'react';
import "./ZoneWraper.css"

class ZoneWraper extends Component {
  render() {
    return (
      <section id={this.props.id} className="zone-wraper flex">
        {this.props.children}
      </section>
    )
  }
}

export default ZoneWraper
