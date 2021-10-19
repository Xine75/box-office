import React from 'react';
import {Switch, Route} from "react-router-dom"

function App() {
  return <Switch>
   
      <Route exact path="/">
      Box Office goes here
      </Route>

      <Route exact path="/starred">
      Starred
      </Route>

      <Route>
      You found yourself a 404 babe
      </Route>
    
      </Switch>;
  
}

export default App;
