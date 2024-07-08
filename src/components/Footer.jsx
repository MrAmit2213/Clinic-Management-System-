import React, { useEffect, useState } from 'react';
import styles from '../css/footer.module.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

const Footer = () => {
    const [data, setData] = useState(null);
    const [email, setEmail] = useState({email:''});

    const location=useLocation();
    const address = location.pathname;

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_HOST}api/subscription/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Email Posted successfully:', data);
            setEmail({email:''})
            // Handle success, maybe show a success message to the user
        })
        .catch(error => {
            console.error('Error Posting Email:', error);
            // Handle error, maybe show an error message to the user
        });
    };

    const onChange = (e)=>{
        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/company/`).then(res => {
              setData(res.data.data[0]);
            });
          } catch (error) {
          }
        };
    
        // Call the function to fetch data
        fetchData();
      }, []);

    return (
        <div className={styles.footer} style={{display:`${address==='/login' || address==='/signup' || address.includes('/admin') ?'none':'block'}`}}>
            <div className={`${styles.flex} ${styles.subs}`}>
                <div className={`${styles.flex} ${styles.subsBox}`}>
                    <i className={`fa-solid fa-envelope ${styles.mailIcon}`} ></i>
                    <input type="text" id='email' name='email' value={email.email} onChange={onChange} placeholder='Enter your email address' />
                    <button onClick={handleSubmit}>Subscribe</button>
                </div>
            </div>
            <div className={`${styles.flex} ${styles.main}`}>
                <div className={styles.leftFooter}>
                    {data && <img style={{maxHeight:'70px', maxWidth:'200px'}} src={`${process.env.REACT_APP_BACKEND_HOST}${data.logo}`} alt="logo" />}
                    <p>Luxe-Decor your premier destination for luxury and modern interior design</p>
                    <div className={styles.social}>
                        <a href={`${data && data.facebook?data.facebook:"https://www.facebook.com/"}`}><i className={`fa-brands fa-square-facebook`}></i></a>
                        <a href={`${data && data.twitter?data.twitter:"https://www.x.com/"}`}><i className={`fa-brands fa-square-twitter`}></i></a>
                        <a href={`${data && data.Instagram?data.Instagram:"https://www.instagram.com/"}`}><i className={`fa-brands fa-square-instagram`}></i></a>
                        <a href={`${data && data.linkedin?data.linkedin:"https://www.linkedin.com/"}`}><i className={`fa-brands fa-linkedin`}></i></a>
                    </div>
                </div>
                <div className={`${styles.flex} ${styles.rightFooter} ${styles.links}`}>
                    <ul>
                        <h3>Useful Links</h3>
                        <li><Link to='/appointments'>Book an Appointment</Link></li>
                        <li><Link to='/blog'>Blogs</Link></li>
                        <li><Link to='/contact'>Contact Us</Link></li>
                    </ul>
                    <ul>
                        <h3>Our Services</h3>
                        <li><Link>Reviews</Link></li>
                        <li><Link>Careers</Link></li>
                        <li><Link>Pricing</Link></li>
                    </ul>
                    <ul>   
                        <h3>Our Services</h3>
                        {data && <li><Link>{data.email}</Link></li>}
                        {data && <li><Link>{data.address}</Link></li>}
                        <h4 className={styles.admin}><Link to='/admin/login'>Admin Login</Link></h4>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer
