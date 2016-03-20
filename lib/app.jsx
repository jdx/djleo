'use strict';

let React          = require('react');
let ReactDOM       = require('react-dom');

let { Router, Route, IndexRoute, browserHistory } = require('react-router');

let Navigation = require('./navigation.jsx');
let Header     = require('./header.jsx');
let Footer     = require('./footer.jsx');

let About = require('./about.jsx');
let Music = require('./music.jsx');

class App extends React.Component {
  render() {
    return <div>
      <Navigation />
      <Header />
      {this.props.children}
      <Footer />
    </div>;
  }
}

ReactDOM.render(<Router history={browserHistory}>
                  <Route path="/" component={App}>
                    <IndexRoute component={Music}/>
                    <Route path="about" component={About}/>
                  </Route>
                </Router>, document.getElementById('app'));
