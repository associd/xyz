import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  render() {
    return (
      <div className="clock flex">
        <div>{this.state.date.getMonth() + 1}<span className="des">Mon</span></div>
        <div>{this.state.date.getHours()}<span className="des">Hou</span></div>
        <div>{this.state.date.getMinutes()}<span className="des">Min</span></div>
        <div>{this.state.date.getSeconds()}<span className="des">Sec</span></div>
      </div>
    )
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.tick()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }
}

ReactDOM.render(<Clock/>, document.querySelector("#root"))
