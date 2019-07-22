import React from 'react';
import "./LinkRankingButton.css"

class LinkRankingButton extends React.Component {
  render() {
    return (
      <a href="/" className="btn link-ranking-button">
        <span className="with-background-icon">排行榜</span>
      </a>
    )
  }
}

export default LinkRankingButton;
