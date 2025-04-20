import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar n0">
        <div className="entry">
            <a href="#">
                {/* <!-- <img src="icon_snip.jpg" alt=""> --> */}
                Entrance & Exit</a> 
         </div>
         <div className="out">
             <a href="#about-us"><i className="ri-tree-line"></i>About Us</a>

         </div>
         <div className="in">

             <a href="#projects"><i className="ri-community-fill"></i>Services</a>
         </div>
         <div className="street">

             <a href="#howItWorks">How-it-works</a>
         </div>
      </nav>
    </div>
  )
}
