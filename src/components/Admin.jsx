import React, { useEffect, useState } from 'react'
import styles from '../css/admin.module.css'
import axios from 'axios';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Admin = () => {
    const authData = useSelector(state => state.Reducer);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const address = location.pathname;
    const [company, setCompany] = useState({});

    useEffect(() => {
        const fetchData = async () => {

            axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/company/`).then(res => {
                setCompany(res.data.data[0]);
            });

        }
        fetchData();
    }, []);

    const logout = (e) => {
        e.preventDefault();
        navigate('/')
        dispatch({
            type: "ADMIN_LOGOUT"
        })
    }

    return (
        <div className={`${styles.flex} ${styles.body}`}>
            <div className={styles.menu}>
                    <div className={styles.logoBox}>
                        <img className={styles.logo} src={`${company.logo ? `${process.env.REACT_APP_BACKEND_HOST}${company.logo}` : "./images/logo.png"}`} alt="logo" />
                    </div>

                    <div>
                        <Link to='/admin/dashboard' className={`${styles.menuItem} ${address==='/admin/dashboard'?styles.active:''}`} >
                            <i className="fa-solid fa-border-all"></i>
                            <p>Dashboard</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/patientManagement' className={`${styles.menuItem} ${address==='/admin/patientManagement'?styles.active:''}`} >
                            <i className="fa-solid fa-users-viewfinder"></i>
                            <p>Patients management</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/appointments' className={`${styles.menuItem} ${address==='/admin/appointments'?styles.active:''}`} >
                            <i className="fa-solid fa-calendar-days"></i>
                            <p>Appointments</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/transactions' className={`${styles.menuItem} ${address==='/admin/transactions'?styles.active:''}`} >
                            <i className="fa-solid fa-money-check"></i>
                            <p>Transactions</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/employers' className={`${styles.menuItem} ${address==='/admin/employers'?styles.active:''}`} >
                            <i className="fa-solid fa-users"></i>
                            <p>Employers</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/healthRecord' className={`${styles.menuItem} ${address==='/admin/healthRecord'?styles.active:''}`} >
                            <i className="fa-solid fa-book-medical"></i>
                            <p>Health records</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/analytics' className={`${styles.menuItem} ${address==='/admin/analytics'?styles.active:''}`} >
                            <i className="fa-solid fa-chart-line"></i>
                            <p>Analytics</p>
                        </Link>
                    </div>
                    <div>
                        <Link to='/admin/blogs' className={`${styles.menuItem} ${address==='/admin/blogs'?styles.active:''}`} >
                            <i className="fa-solid fa-newspaper"></i>
                            <p>Blogs</p>
                        </Link>
                    </div>
                <div className={styles.personal}>
                    <div>
                        <Link to='/admin/profile' className={`${styles.menuItem} ${address==='/admin/profile'?styles.active:''}`} >
                            <i className="fa-solid fa-user"></i>
                            <p>Profile</p>
                        </Link>
                    </div>
                    <div>
                        <Link onClick={logout} className={`${styles.menuItem}`} >
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <p>Log Out</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.navbar}>
                    <i className="fa-regular fa-bell"></i>
                    <img src={`${authData.image ? `${process.env.REACT_APP_BACKEND_HOST}${authData.image}` : "./images/default-profile.jpg"}`} alt="profile" />
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Admin
