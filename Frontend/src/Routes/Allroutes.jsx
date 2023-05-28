import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from "../Components/Home"
import OEM_Specs from "../Components/OEM_Specs"
import Dealers from '../Components/Dealers'
import Marketplace from '../Components/Marketplace'

const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/OEM_Specs" element={<OEM_Specs/>}/>
        <Route path="/Dealers" element={<Dealers/>}/>
        <Route path="/Marketplace" element={<Marketplace/>}/>
    </Routes>
  )
}

export default Allroutes