import React from 'react';
import "./Recommend.css";

class Recommend extends React.Component {
  render() {
    return (
      <section className="recommend">
        <ul className="flex">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <ul className="flex">
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
        </ul>
      </section>
    )
  }
}

export default Recommend;
