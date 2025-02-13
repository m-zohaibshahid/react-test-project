'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setToken } from '../redux/userSlice';
import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import '../Styling/style.css'
import { compareHashedPassword } from '../utils';

const Login = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '', loading: false });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const user = users.find((u) => u.email === loginForm.email);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    const isPwdMatch = compareHashedPassword(loginForm.password, user.password);
    if (!isPwdMatch) {
      setError('Invalid password');
      return;
    }

    // Generate a fake token (replace this with real authentication)
    const token = `token_${user.email}_${user.password}`;

    // Dispatch action to store the token globally
    dispatch(setToken({ token }));
    alert('Login successful!');
    router.push('/');
  };

  return (
    <div className="flex" style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'40px',marginBottom:'120px'}}>
      <div className="input-container" style={{maxWidth:'900px',border:'1px solid #dddd',padding:'30px'}}>
        <h2 >Welcome Back!</h2>
        {error && <p >{error}</p>}
        <div className="mb-6"> 
          <label htmlFor="email" >Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Enter your email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          
          />
        </div>

        <Button
          disabled={loginForm.loading}
          onClick={handleLogin}
          loading={loginForm.loading}
          text="Login"
        />
       <div style={{display:'flex',maxWidth:'400px',margin:'auto'}}>
        <p>
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
        </div>
      </div>
    </div>
  ); 
};

export default Login;
