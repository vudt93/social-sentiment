import React, {Component} from 'react';
import Header from './components/Header'
import Main from "./components/Main";
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
          <Header />
          <Main/>
      </div>
    );
  }
}

export default connect(
)(App);
