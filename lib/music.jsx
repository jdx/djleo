'use strict';

let React = require('react');

class Music extends React.Component {
  login(e) {
    console.log('x');
    console.log(e);
  }
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
            <div className="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false" data-auto-logout-link="false" onlogin={this.login}></div>
          </div>
        </div>
      </div>
    </section>;
  }
}

module.exports = Music;
