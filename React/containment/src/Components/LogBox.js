import React from 'react';
import "./LogBox.css"
import Dialog from "./Dialog"

class LogBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogs: []
    }
    this.handleAction = {
      add: () => {
        let list = this.state.dialogs.slice()
        list.unshift(<Dialog title="你好" message="世界" key={list.length}/>)
        this.setState({
          dialogs: list
        })
      },
      del: () => {
        let list = []
        this.setState({
          dialogs: list
        })
      }
    }
  }
  render() {
    return (
      <>
        <button onClick={event => this.handleClick("add")}>对话框</button>
        <ul className="LogBox fixed-left">
          <button onClick={event => this.handleClick("del")}>close All</button>
          {this.state.dialogs}
        </ul>
      </>
    )
  }
  handleClick(action) {
    this.handleAction[action]()
    console.log(this)
  }
}

export default LogBox;
