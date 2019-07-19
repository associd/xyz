import React from 'react';
import Top from './Top';
import "./header.css"

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="top">
          <Nav/>
        </div>


        {/*<section className="media-box head-content">
          <Search/>
        </section>*/}
      </header>
    )
  }

}

export default Header;
