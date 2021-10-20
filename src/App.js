import React from 'react';
import {Switch, Route} from "react-router-dom";
import Navs from "./components/Nav";
import Home from "./pages/Home"
import Starred from './pages/Starred';

function App() {
  return(

  <div>

    <Navs />
      <Switch>
    
        <Route exact path="/">
        <Home />
        </Route>

        <Route exact path="/starred">
        <Starred />
        </Route>

        <Route exact path="/actors">
        Actors
        </Route>

        <Route>
        You found yourself a 404 babe
        </Route>
      
        </Switch>
    </div>
  );
}

export default App;
