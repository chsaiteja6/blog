import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"
import Post from './Post'

export default function Layout() {
  return (
    <div>
      <main>
        <Header/>
        
        <Outlet/>
      </main>
    </div>
  )
}
