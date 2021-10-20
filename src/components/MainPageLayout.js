import React from 'react'
import Nav from "./Nav"

const MainPageLayout = ({ children }) => {
    return(
        <div>
      
          <Nav />
          { children }
            
        </div>
        );
}

export default MainPageLayout
