'use strict';

let React = require('react');

class Music extends React.Component {
  render() {
    return <section id="music">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Listen</h2>
            <hr className="star-primary"/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            music
          </div>
        </div>
      </div>
    </section>;
  }
}

module.exports = Music;
