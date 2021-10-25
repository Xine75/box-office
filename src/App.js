import React from 'react';
import {Switch, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components"
import Navs from "./components/Nav";
import Home from "./pages/Home"
import Show from "./pages/Show"
import Starred from './pages/Starred';

//global variables
const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return(
    <ThemeProvider theme={theme}>

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

    </ThemeProvider>
  
  );
}

export default App;
