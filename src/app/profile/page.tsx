'use client';

import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { useRouter } from 'next/navigation';
import { updatePassword, updateUser } from '../redux/userSlice';
import '../Styling/style.css'


const Profile = () => {
  const { loggedInUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [form, setForm] = useState({
    userName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    loading: false,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      userName: loggedInUser?.userName ?? '',
      email: loggedInUser?.email ?? '',
    }));
  }, [loggedInUser]);

  const handleNext = () => {
    setStep(2);
    setProgress(100);
  };

  const handleBack = () => {
    setStep(1);
    setProgress(50);
  };
  const handleOnChangePassword = () => {
    dispatch(updatePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword }));
    alert(" Password updated successfully!");
  };

 
  const handleOnProfileUpdate = () => {
    dispatch(updateUser({ email: form.email, userName: form.userName }));
    alert('Profile updated successfully!');
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '6px' }}>
      <div style={{ height: '10px', background: '#e0e0e0', borderRadius: '5px', marginBottom: '20px' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'green', borderRadius: '5px' }}></div>
      </div>

      {step === 1 && (
        <div>
          <h2>Step 1: Update Profile</h2>
          <label htmlFor="email" >Name</label>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={form.userName}
            onChange={handleChange}
          />
           <label htmlFor="email" >Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <div className="select-btn" style={{display:'flex',flexGrow:'1',gap:'90px'}}>
          <Button loading={form.loading} onClick={handleOnProfileUpdate} text="Update" />
          <Button loading={form.loading} onClick={handleNext} text="Next" />
          </div>
        </div>
      )}

      {step === 2 && ( 
        <div className='select-btn' >
          <h2>Step 2: Change Password</h2>
          <label htmlFor="email" >Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
          />
           <label htmlFor="email" >New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange} 
          />
          <div style={{ display: 'flex', gap: '90px',flexGrow:'1', }}>
            <Button loading={form.loading} onClick={handleBack} text="Back" />
            <Button loading={form.loading} onClick={handleOnChangePassword} text="Update" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
