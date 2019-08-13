import React, {Component} from 'react';
import "./Card.css"

class Card extends Component {
  constructor(props) {
    super(props)
    this.dom = {
      lazingImg: {
          recommend: <img className="content-img" src={this.props.data.img} alt=""/>
      },
      info: {
          recommend: (
            <div className="info recommend mask">
              <p className="title">【湊あくあ一周年纪念】Letter Song【翻唱】</p>
              <p className="author">up主：囧仙</p>
              <p className="play">播放：9.2万</p>
            </div>
          )
      }
    }
  }
  render() {
    return (
      <div className="card">
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
          {this.props.content.des
            ? <div className="description">
                <div className="title">abc asdf fdkasf dsf abc asdf fdk asf dsf</div>
                <div className="sort">网游 · 英雄联盟</div>
              </div>
            : ""
          }

        </a>
      </div>
    )
  }
}

export default Card
