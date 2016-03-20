'use strict';

let React = require('react');

class Footer extends React.Component {
  render() {
    return <footer className="text-center">
      <div className="footer-below">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              Code for this app licensed WTFPL<br/>Available at <a href="https://github.com/dickeyxxx/djleo">github.com/dickeyxxx/djleo</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
  }
}

module.exports = Footer;
