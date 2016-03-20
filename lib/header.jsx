'use strict';

let React = require('react');

class Header extends React.Component {
  render() {
    return <header>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <img className="img-responsive" src="img/leo.jpg" alt=""/>
            <div className="intro-text">
              <span className="name">Music by LEO</span>
              <hr className="star-light"/>
              <span className="skills">Deep House - Tropical - Vocal</span>
            </div>
          </div>
        </div>
      </div>
    </header>;
  }
}

module.exports = Header;
