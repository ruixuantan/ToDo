import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Routes from './Routes';
import './stylesheets/App.css';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <h1>My To-Do List</h1>
        <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <hr />
        </div>
        <Routes />
      </Router>
    );
  }
}
