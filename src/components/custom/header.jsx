import React, { useState, useEffect } from 'react'
import logo from '/logo.jpg'
import { Button } from '../ui/button'
import { googleLogout } from '@react-oauth/google'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'



function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const[openDialog , setOpenDialog] = useState(false);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    console.log("user is : ", storedUser);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  });
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      }).then((res) => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
  }
  return (
    <div className='flex justify-between items-center p-4'>
      <img src={logo} alt="logo" className='w-12 h-12' />
      <div>
        <div>
          {user ? (
            <div className='flex items-center gap-2'>
              {/* {user.name} */}
              <Button variant='outline'>My Trips  </Button>
              <Popover>
                <PopoverTrigger> <img src={user.picture} alt="user" className='w-8 h-8 rounded-full' /></PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    localStorage.removeItem('user');
                    googleLogout();
                    setUser(null);
                    window.location.href = '/';
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>

            </div>
          ) : (
            <Button onClick={() => {
              // handle login
              setOpenDialog(true);
            }} >Log in</Button>
          )}
        </div>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img className='w-12 h-12' src="/logo.jpg" alt="" />
              <h2 className='font-bold text-lg mt-8'>Sign In with Google</h2>
              <p>Sign in to the app with google authentication securely. </p>

              <Button className="w-full mt-5" onClick={login}>
                <FcGoogle />Sign in with google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header;