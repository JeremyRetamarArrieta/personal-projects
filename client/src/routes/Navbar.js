import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props)=>{
 return(
     <div className="navbar">
         

         {props.token && 
         <>
         <Link to="/">Home</Link>
         /
         <Link to="/Posts">Posts</Link>
         /
         <Link to="/ChatRoom">ChatRoom</Link>
         /
         <Link to="/Contact">Contact</Link>
         </>}
     </div>
    )
}

export default Navbar