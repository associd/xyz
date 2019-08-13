import React, {Component} from 'react';
import Card from './Card';

class CardBox extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="card-box">
        <Card/>
      </div>
    )
  }
}

export default CardBox
