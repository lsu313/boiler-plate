
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import auth from './Hoc/auth'
function App() {
  return (
    <Router>
    <div>
      

      <hr />

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component = {auth(LandingPage, null)}/>
          {/* <LandingPage />
        </Route> 를 component로 넣어줄수 있음 */}
        <Route exact path="/Login" component = {auth(LoginPage, false)}/>
        <Route exact path="/register" component = {auth(RegisterPage, false)}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;



// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }