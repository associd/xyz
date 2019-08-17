import React, {Component} from 'react';
import "./Card.css"

class Card extends Component {
  constructor(props) {
    super(props)
    this.dom = {
      lazingImg: {
          recommend: <img className="content-img" src={this.props.data.img} alt=""/>,
          promotion: <img className="content-img" src={this.props.data.img} alt=""/>,
      },
      info: {
        recommend: (
          <div className="info recommend mask">
            <p className="title">{this.props.data.title}</p>
            <p className="author">{this.props.data.author}</p>
            <p className="play">{this.props.data.play}</p>
          </div>
        ),
        promotion: (
          <div className="info">
            
          </div>
        ),
      },
      description: {
        promotion: (
          <div className="description">
            <div className="title">{this.props.data.title}</div>
          </div>
        )
      }
    }
  }
  render() {
    return (
      <div className={`card card-${this.props.content}`}>
        <a href={this.props.data.link} title={this.props.data.title}>
          <div className="pic">
            <div className="lazing-img">
              {this.dom.lazingImg[this.props.content]}
              {this.props.content.contentImg ? <img className="content-img" src={this.props.data.img} alt=""/> : ""}
              {this.props.content.frontImg ? <img className="front-img" src="./img/2.png" alt=""/> : ""}
            </div>
            <div className="mask flex item-bottom">
              {this.dom.info[this.props.content]}
            </div>
          </div>
          {this.dom.description[this.props.content]}
        </a>
      </div>
    )
  }
}

export default Card
