import React from 'react'
import Nav from "./Nav"
import Title from "./Title"

//childen are the pages: show, home, starred
const MainPageLayout = ({ children }) => {
    return(
        <div>
          <Nav />
          <Title title="Box Office" subtitle="Are you looking for a TV show or an actor?" />
          { children } 
        </div>
        );
}

export default MainPageLayout
