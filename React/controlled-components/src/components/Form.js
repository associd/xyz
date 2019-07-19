import React from 'react';
import "../CSS/Form.css"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hobby: "basketball"
    }
  }
  handleInput(event) {
    console.log(this)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSelect(event) {
    console.log(event.target.value)
    this.setState({
      hobby: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <form className="form" onSubmit={event => this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>你的名字</td>
              <td>
                <input
                  name="userName"
                  placeholder="张三"
                  type="text"
                  onChange={event => this.handleInput(event)}
                />
              </td>
            </tr>
            <tr>
              <td>你的电话号码</td>
              <td>
                <input
                  name="userNumber"
                  placeholder="123456789"
                  type="number"
                  max="11"
                  onChange={event => this.handleInput(event)}
                />
              </td>
            </tr>
            <tr>
              <td>爱好</td>
              <td>
                <select name="hobby" defaultValue="basketball" onChange={event => this.handleInput(event)}>
                  <option value="sing">唱</option>
                  <option value="jump">跳</option>
                  <option value="rap">rap</option>
                  <option value="basketball">篮球</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>说明</td>
              <td><textarea name="userDescription" onChange={event => this.handleInput(event)}></textarea></td>
            </tr>
            <tr>
              <td>国籍</td>
              <td>
                <input name="nationality" readOnly value="中国"/>
              </td>
            </tr>
            <tr>
              <td>提交</td>
              <td><input type="submit" value="请疯狂的点击我"/></td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

export default Form;
