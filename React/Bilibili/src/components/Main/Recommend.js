import React from 'react';
import "./Recommend.css";

class Recommend extends React.Component {
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
          let list = result.recommend.map((item, index) => {
            return <li className="recommend-item" key={index}><img src={item} alt=""/></li>
          })
          this.setState({
            data: list
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }
  render() {
    return (
      <section className="recommend">
        <ul className="flex flex-wrap">
          {this.state.data}
        </ul>
      </section>
    )
  }
}

export default Recommend;
