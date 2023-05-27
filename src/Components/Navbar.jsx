import React from 'react'
import { NavLink } from 'react-router-dom'
const links=[
    {path:"/",text:"HOME"},
    {path:"/OEM_Specs",text:"OEM Specs"},
    {path:"/Dealers",text:"Add Car"},
    {path:"/Marketplace",text:"Marketplace"}
]

const Navbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-around",fontSize:"1.3rem",textDecoration:"none",marginBottom:"3rem"}}>
        {
            links.map((el)=>(
                <NavLink key={el.path} to={el.path}>{el.text}</NavLink>
            ))
        }
    </div>
  )
}

export default Navbar