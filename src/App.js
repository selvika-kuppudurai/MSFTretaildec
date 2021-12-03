import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import DeepDive from "./pages/deepDive";

import Navigationformanage from "./components/navigationformanage";
import ActivityTrack from './components/ActivityTrack';
import Navigation from "./components/Navigation";

import './App.css';

const App = (props) => {


  const [navigationLinks] = useState([{ link: "Summary", to: "/summary" }, { link: "Deepdive", to: "/deepdive" }])

  useEffect(() => {
    if (sessionStorage.getItem('summaryFilter')) {
      sessionStorage.removeItem('summaryFilter')
    }
    if (sessionStorage.getItem('deepdiveFilter')) {
      sessionStorage.removeItem('deepdiveFilter')
    }
  }, [])
  return (

    <Router>
      <>
        <Header />
        <div className="container-xl">
          {window.innerWidth < 600 ? <Navigation navigationLinks={navigationLinks} /> : <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/deepdive" component={DeepDive} />
          <Route path="/manage" component={Navigationformanage} />
          <Route path="/activitytrack" component={ActivityTrack} />
          </Switch>}
          {/*  /> */}
          
        </div>
      </>
    </Router>

  )
}


export default App;
