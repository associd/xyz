import React, {Component} from 'react';

class ZoneWraper extends Component {
  render() {
    return (
      <section>
        {this.props.left}
      </section>
    )
  }
}

export default ZoneWraper
