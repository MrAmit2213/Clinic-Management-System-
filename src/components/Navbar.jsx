import React, { useEffect, useState } from 'react'
import styles from '../css/navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {
    const authData = useSelector(state => state.Reducer);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const address = location.pathname;
    const [disp, setDisp] = useState(false);
    const [company, setCompany] = useState({});
    const [profile, setProfile] = useState(false);
    // eslint-disable-next-line
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (!authData.isLoggedIn) {
            setLogin(false);
        } else {
            setLogin(true);
        }
    }, [authData.isLoggedIn]);


    useEffect(() => {
        const fetchData = async () => {

            axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/company/`).then(res => {
                setCompany(res.data.data[0]);
            });

        }
        fetchData();
    }, []);

    const show = () => {
        setProfile(false);
        disp ? setDisp(false) : setDisp(true);
    }

    const showProfile = () => {
        setDisp(false);
        profile ? setProfile(false) : setProfile(true);
    }

    const def = () => {
        setDisp(false);
        setProfile(false);
    }

    const logout = (e) => {
        e.preventDefault();
        navigate('/')
        dispatch({
            type: "USER_LOGOUT"
        })
    }

    return (
        <div className={styles.navbar} style={{ display: `${address === '/login' || address === '/signup' || address.includes('/admin') ? 'none' : 'block'}` }}  >
            <ul>
                <Link onClick={def} to='/'>
                    <li><img className={styles.logo} src={`${company.logo ? `${process.env.REACT_APP_BACKEND_HOST}${company.logo}` : "./images/logo.png"}`} alt="logo" /></li>
                </Link>
                <div className={`${styles.flex} ${styles.link}`}>
                    <div className={`${styles.flex} ${styles.change}`}>
                        <li onClick={def}><Link className={`${address === '/' ? styles.active : ''}`} to='/'>Home</Link></li>
                        <li onClick={def}><Link className={`${address === '/appointments' ? styles.active : ''}`} to='/appointments'>Appointments</Link></li>
                        <li onClick={def}><Link className={`${address === '/blog' ? styles.active : ''}`} to='/blog'>Blogs</Link></li>
                        <li onClick={def}><Link className={`${address === '/contact' ? styles.active : ''}`} to='/contact'>Contact</Link></li>
                    </div>
                    {
                        login ?
                            <div className={styles.profile}>
                                <img onClick={showProfile} src={`${authData.image ? `${process.env.REACT_APP_BACKEND_HOST}${authData.image}` : "./images/default-profile.jpg"}`} alt="profile" />
                                <br />
                                <div className={`${styles.profileBar} ${profile ? styles.blk : ''} `}>
                                    <div className={`${styles.flex} ${styles.personal}`}>
                                        <img src={`${authData.image ? `${process.env.REACT_APP_BACKEND_HOST}${authData.image}` : "./images/default-profile.jpg"}`} alt="profile" />
                                        <ul>
                                            <li>Name</li>
                                            <li className={styles.email}>email</li>
                                        </ul>
                                    </div>
                                    <div className={styles.sep}>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/profile'><i className='fa-solid fa-user'></i><p>Your Profile</p></Link></li>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/support'><i className='fa-solid fa-headset'></i><p>Support</p></Link></li>
                                    </div>
                                    <div className={styles.sep}>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/profile/consultationHistory'><i className='fa-solid fa-book-medical'></i><p>Consultation History</p></Link></li>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/profile/paymentHistory'><i className='fa-solid fa-money-check'></i><p>Payment History</p></Link></li>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/profile/vacinationHistory'><i className='fa-solid fa-money-check'></i><p>Vacination History</p></Link></li>
                                    </div>
                                    <div className={styles.sep}>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/privacyPolicy'><i className='fa-solid fa-shield'></i><p>Privacy Policy</p></Link></li>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} to='/profile/help'><i className='fa-solid fa-question'></i><p>Help</p></Link></li>
                                        <li onClick={showProfile} className={styles.icons}><Link className={styles.proBtn} onClick={logout}><i className="fa-solid fa-arrow-right-from-bracket"></i><p>Sign Out</p></Link></li>
                                    </div>
                                </div>
                            </div>
                            :
                            <li className={styles.btn}><Link to='/login'>Get Started</Link></li>
                    }
                    <div className={`${styles.mobIcon}`} onClick={show}>
                        <i className="fa-solid fa-bars"></i>
                        <br />
                        <div className={`${styles.mobMenu} ${disp ? styles.blk : ''} `}>
                            <li onClick={def}><Link to='/'>Home</Link></li>
                            <li onClick={def}><Link to='/appointments'>Appointments</Link></li>
                            <li onClick={def}><Link to='/blog'>Blogs</Link></li>
                            <li onClick={def}><Link to='/contact'>Contact</Link></li>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default Navbar
