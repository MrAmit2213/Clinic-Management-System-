import React from 'react'
import styles from '../css/profile.module.css'
import { Outlet } from 'react-router-dom';

const Profile = () => {
  const date = Date()
  return (
    <div className={styles.page}>
      <h1>Welcome, First_Name</h1>
      <h2>{date.substring(0, 3) + ',' + date.substring(7, 10) + date.substring(3, 7) + date.substring(10, 15)}</h2>
      <Outlet />
    </div>
  )
}

export default Profile
