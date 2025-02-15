import React from 'react'
import logo from '/logo.jpg'
import { Button } from '../ui/button'

function header() {
  const user = localStorage.getItem('user');
  // console.log("userID is  : " , user);
  return ( 
    <div className='flex justify-between items-center p-4'>
        <img src= {logo} alt="logo" className='w-12 h-12'/>
        <Button>
          {user ? 'Sign Out' : 'Sign In'}
        </Button>
    </div>
  )
}

export default header;