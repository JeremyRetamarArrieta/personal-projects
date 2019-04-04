import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props)=>{
 return(
     <div className="navbar">
         <Link to="/">Home</Link>
         <Link to="/Posts">Posts</Link>
         <Link to="/ChatRooms">ChatRooms</Link>
         <Link to="/aboutus">About Us</Link>
     </div>
 )
    

}

export default Navbar