import React, { useEffect, useState } from 'react'
import styles from '../css/contact.module.css'
import Modal from './Modal'

const Form = () => {
    const [detail, setDetail] = useState({ fname: '', lname: '', email: '', phone_number: '', message: '' })
    const [cdetail, setCdetail] = useState({ name: '', email: '', phone_number: '', message: '' })
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            setCdetail({ name: detail.fname + ' ' + detail.lname, email: detail.email, phone_number: detail.phone_number, message: detail.message })
        }
        fetchData();
    }, [detail]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_HOST}api/query/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cdetail),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Query posted successfully:', data);
                handleOpen();
                setDetail({ fname: '', lname: '', email: '', phone_number: '', message: '' })
                setCdetail({ name: '', email: '', phone_number: '', message: '' })
                // Handle success, maybe show a success message to the user
            })
            .catch(error => {
                console.error('Error posting query:', error);
                // Handle error, maybe show an error message to the user
            });
    };

    const onChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className={`${styles.query}`}>
                <Modal isOpen={open} onClose={handleClose}>
                    <div className={styles.modalItem}>
                        <p>Your Query has been Submitted!</p>
                        <button onClick={handleClose}>Ok</button>
                    </div>
                </Modal>
                <span className={styles.background}>contact us</span>
                <div className={`${styles.flex} ${styles.queryBox}`}>
                    <div className={styles.written}>
                        <h1>Have a Query! Let's Discuss</h1>
                        <p>Thank you for getting in touch! Kindly, fill the form, have a great day!</p>
                    </div>
                    <div className={styles.form}>
                        <div className={`${styles.flex} ${styles.spc}`}>
                            <input type="text" name='fname' id='fname' value={detail.fname} onChange={onChange} placeholder='First Name' />
                            <input type="text" name='lname' id='lname' value={detail.lname} onChange={onChange} placeholder='Last Name' />
                        </div>
                        <div className={`${styles.flex} ${styles.spc}`}>
                            <input type="text" name='phone_number' id='phone_number' value={detail.phone_number} onChange={onChange} placeholder='Phone Number' />
                            <input type="text" name='email' id='email' value={detail.email} onChange={onChange} placeholder='E-mail' />
                        </div>
                        <div>
                            <input className={styles.issue} type="text" name='message' id='message' value={detail.message} onChange={onChange} placeholder='Issue' />
                        </div>
                        <div className={styles.submit}>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                <span className={styles.background2}>i-Care</span>
            </div>
        </>
    )
}

export default Form
