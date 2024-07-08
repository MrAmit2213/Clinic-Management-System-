import React from 'react'
import styles from '../css/profile.module.css'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const authData = useSelector(state => state.Reducer);
  const date = Date()
  return (
    <div className={styles.page}>
      <h1>Welcome, {authData.fName}</h1>
      <h2>{date.substring(0, 3) + ',' + date.substring(7, 10) + date.substring(3, 7) + date.substring(10, 15)}</h2>
      <Outlet />
    </div>
  )
}

export default Profile
