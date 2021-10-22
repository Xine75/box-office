import React from 'react';
import {Switch, Route} from "react-router-dom";
import Navs from "./components/Nav";
import Home from "./pages/Home"
import Show from "./pages/Show"
import Starred from './pages/Starred';

function App() {
  return(
      <Switch>
        <Route exact path="/">
        <Home />
        </Route>

        <Route exact path="/starred">
        <Starred />
        </Route>

        <Route exact path="/show/:id">

          <Show />
        </Route>

        <Route exact path="/actors">
        Actors
        </Route>

        <Route>
        You found yourself a 404 babe
        </Route>
      </Switch>
  
  );
}

export default App;
