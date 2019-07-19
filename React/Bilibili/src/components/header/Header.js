import React from 'react';
import Top from './Top';
import Search from './Search';
import "./header.css"

class Header extends React.Component {
  render() {
    return (
      <header>
        <Top/>
        <Search/>
      </header>
    )
  }

}

export default Header;
