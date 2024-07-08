import React, { useEffect, useState } from 'react'
import styles from '../css/contact.module.css'
import Form from './Form'
import Map from './Map';
import axios from 'axios';

const Contact = () => {
    const [company, setCompany] = useState({});
    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/company/`).then(res => {
                    setCompany(res.data.data[0]);
                });
            } catch (error) {
                console.log('error')
            }
        }
        const fetchContact = async () => {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/contact/`).then(res => {
                    setContact(res.data.data[0]);
                });
            } catch (error) {
                console.log('error')
            }
        }

        fetchCompany();
        fetchContact();
    }, []);

    return (
        <div className={styles.contact}>
            <div className={`${styles.flex} ${styles.detail}`}>
                <div className={styles.left}>
                    <h1>DISCOVER US</h1>
                    <p>{contact.description?contact.description:'i-Care is here to help you; Our experts are available to answer any questions you might have. We’ve got the answers.'}</p>
                    <h2>VISIT US</h2>
                    <p>{company.address ? company.address : 'No address'}</p>
                    <p className={styles.others}>Feel free to get in touch with us through our channels:</p>
                    <h2>E-MAIL US</h2>
                    <p>{company.email ? company.email : "No E-Mail"}</p>
                    <h2>CONTACT US</h2>
                    {company.telephone_number || company.phone_number ?
                        <div>
                            <p>{company.telephone_number ? company.telephone_number : ''}</p>
                            <p>{company.phone_number ? company.phone_number : ''}</p>
                        </div>
                        : 'No Contact Numbers Available'
                    }
                </div>
                <div className={styles.right}>
                    <div>
                        <div className={`${styles.flex} ${styles.top}`}>
                            <img className={styles.one} src={`${contact.image_one?`${process.env.REACT_APP_BACKEND_HOST}${contact.image_one}`:"./images/home1.png"}`} alt="1" />
                            <img className={styles.two} src={`${contact.image_two?`${process.env.REACT_APP_BACKEND_HOST}${contact.image_two}`:"./images/home2.png"}`} alt="2" />
                        </div>
                        <div className={`${styles.flex} ${styles.bottom}`}>
                            <img className={styles.one} src={`${contact.image_three?`${process.env.REACT_APP_BACKEND_HOST}${contact.image_three}`:"./images/home2.png"}`} alt="1" />
                            <img className={styles.two} src={`${contact.image_four?`${process.env.REACT_APP_BACKEND_HOST}${contact.image_four}`:"./images/home1.png"}`} alt="2" />
                        </div>
                    </div>
                </div>
            </div>
            <Form />
            <div className={styles.map}>
                {contact && <Map link={contact.map} />}
            </div>
        </div>
    )
}

export default Contact
