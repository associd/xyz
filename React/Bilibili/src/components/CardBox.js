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
    console.log(this.props)
    if (this.props.data) {
      let list = this.props.data.map((item, index) => {
        return (
          <Card
            key={index}
            data={{...item}}
          />
        )
      })
      this.setState({
        data: list
      })
    }
  }
  render() {
    return (
      <section className="card-box">
        {this.state.data}
      </section>
    )
  }
}

export default CardBox;
