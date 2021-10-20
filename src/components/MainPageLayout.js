import React from 'react'
import Nav from "./Nav"
import Title from "./Title"

const MainPageLayout = ({ children }) => {
    return(
        <div>
      
          <Nav />
          <Title title="Box Office" subtitle="Are you looking for a movie or an actor?" />
          { children }
            
        </div>
        );
}

export default MainPageLayout
