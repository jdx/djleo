'use strict';

let React = require('react');

class About extends React.Component {
  render() {
    return <section id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>About</h2>
            <hr className="star-primary"/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-lg-offset-4">
            <p>Leo Gonzales posts amazing music on his Facebook page. This app tracks all that music to make it easy to find.</p>
            <p>This uses the Facebook Graph API on behalf of your user. Because this simply filters his Facebook posts, you'll need to be friends with Leo for it to work.</p>
            <p>Created by Jeff Dickey.</p>
          </div>
        </div>
      </div>
    </section>;
  }
}

module.exports = About;
