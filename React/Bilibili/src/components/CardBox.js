import React from 'react';
import "./CardBox.css";
import Card from './Card';

class CardBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    fetch("./data.json")
      .then(res => res.json())
      .then(
        (result) => {
          if (result[this.props.content]) {
            let list = result[this.props.content].map((item, index) => {
              return (
                <Card className="recommend-item"
                  key={index}
                  data={{...item}}
                  content={this.props.content}
                  />
              )
            })
            this.setState({
              data: list
            })
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }
  render() {
    return (
      <section className={`card-box flex flex-wrap between-x between-y ${this.props.content}`}>
        {this.state.data}
      </section>
    )
  }
}

export default CardBox;
