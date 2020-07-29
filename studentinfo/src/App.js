import React from 'react';
import Home from './Component/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavItem from './Component/Nav'
import Student from './Component/Student';
import Project from './Component/Project';

function App() {
  return (
    <div className="App">
    <Router>
      <NavItem />
      <Route path="/home" exact component={Home}/>
      <Route path="/students" exact component={Student}/>
      <Route path="/projects" exact component={Project}/>
     {/* <Home /> */}
    </Router>
    </div>
  );
}

export default App;
