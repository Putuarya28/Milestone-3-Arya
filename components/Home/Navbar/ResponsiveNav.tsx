'use client'
import React, { useState } from "react";
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false)

  const handleNavOpen = ()=>setShowNav(true)
  const handleNavClose=()=>setShowNav(false)

  return (
    <div>
      <Nav openNav={handleNavOpen} />
      <MobileNav showNav={showNav} closeNav={handleNavClose} />
    </div>
  )
}

export default ResponsiveNav