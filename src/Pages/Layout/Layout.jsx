import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

export default function Layout() {
  return <>
  
    <Navbar/>
    <Outlet/>
  
  </>
}
