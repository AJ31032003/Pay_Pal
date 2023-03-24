import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from './Home'
import SingleSprint from './SingleSprint'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/:id" element={<SingleSprint/>}/>
     </Routes>   
  )
}

export default AllRoutes