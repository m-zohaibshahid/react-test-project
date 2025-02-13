// /app/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout, deleteUser } from '../redux/userSlice'; // Assuming you have Redux for state management
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import '../Styling/style.css'

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {users} = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login'); 
    window.location.reload();
  }; 

  const handleDeleteAccount = () => {
    dispatch(deleteUser());
    router.push('/login'); 
    window.location.reload();

  }; 

  return (
    <header style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 ,border:'1px solid #dddd',padding:'10px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <h1><Link href="/">Dashboard</Link></h1>
        {users && (
          <nav className='nav-btn'>
            <button onClick={() => router.push('/profile')}>Update Profile</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
