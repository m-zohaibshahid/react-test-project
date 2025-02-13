'use client';  // Make sure this is a client-side component

import { useState } from 'react';
import Button from '../components/Button';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { generateHashedPassword, generateUUID } from '../utils';
import { addUser } from '../redux/userSlice';
import { useRouter } from 'next/navigation';

const Register = () => {
 const {users} = useAppSelector(state => state.user);
 const dispatch = useAppDispatch();
 const router = useRouter();
  const [registrationForm, setRegisterationFrom] = useState<{email: string; password: string; userName: string; loading: boolean;}>({email: '', password: '', userName: '', loading: false});

  const handleRegister = () => {
    // Handle registration logic
    const {email, password, userName} = registrationForm;
    const userId = generateUUID();
    const user = users.find(user => user.email === email);
    if(user){
        alert('Email already in use please use another email address');
    }
    dispatch(addUser({id: userId, email, password: generateHashedPassword(password), userName}));
    alert("User Registertion successful");
    router.push('/login');
  };

  return (
    <div style={{maxWidth:'400px',margin:'auto',marginTop:'60px',border:'1px solid #dddd',padding:'15px'}}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="User Name"
        value={registrationForm.userName}
        onChange={(e) => setRegisterationFrom((prevRegisterationForm) => ({...prevRegisterationForm, userName: e.target.value}))}
      />
      <input
        type="email"
        placeholder="Email"
        value={registrationForm.email}
        onChange={(e) => setRegisterationFrom((prevRegisterationForm) => ({...prevRegisterationForm, email: e.target.value}))}
      />
      <input
        type="password"
        placeholder="Password"
        value={registrationForm.password}
        onChange={(e) => setRegisterationFrom((prevRegisterationForm) => ({...prevRegisterationForm, password: e.target.value}))}
      />
      <Button style={{width:'100%',padding:'8px'}}loading={registrationForm.loading} onClick={handleRegister} text= "Register" />
    </div>
  );
};

export default Register;
