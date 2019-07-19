import React from 'react';
import "./FancyBorder.css"

class FancyBorder extends React.Component {
  render() {
    return (
      <div className="FancyBorder">
        {this.props.children}
      </div>
    )
  }
}

export default FancyBorder;
