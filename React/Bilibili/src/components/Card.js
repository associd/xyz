import React, {Component} from 'react';
import "./Card.css"

class Card extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="card">
        <a href="">
          <div className="pic">
            <img src="./img/1.jpg" alt=""/>
            <div className="mask flex flex-between-x">
              <div className="author">sdf</div>
              <div className="online">123</div>
            </div>
          </div>
          <div className="description">
            <div className="title">abc asdf fdkasf dsf abc asdf fdkasf dsf</div>
            <div className="sort">网游 · 英雄联盟</div>
          </div>
        </a>
      </div>
    )
  }
}

export default Card
