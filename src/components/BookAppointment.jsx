import React, { useEffect, useState } from 'react';
import styles from '../css/bookAppointment.module.css'
import { Link, useParams } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux';

const BookAppointment = () => {
    const authData = useSelector(state => state.Reducer);
    const { id } = useParams();
    const [value, setValue] = useState(new Date());
    const [doc, setDoc] = useState(null);
    const [pat, setPat] = useState(null);
    const [detail, setDetail] = useState({ name: '', doctor_id: id, age: '', gender: '', weight: '', blood_group: '', email: '', phone_number: '', message: '', date: value.toString().substring(4, 15), time: '09:00 AM - 11:00 AM' })

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/${id}/`);
                const data = await response.json();
                setDoc(data.data[0]);
            } catch (error) {
                console.error("Error fetching Doctor's data:", error);
            }
        };

        fetchItem();
    }, [id]);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/${authData.userId}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPat(data.data[0]);
        } catch (error) {
            console.error("Error fetching Doctor's data:", error);
        }
    };
    useEffect(() => {
        if (authData.userId) {
            fetchItem();
        }
        // eslint-disable-next-line
    }, [authData.userId]);

    useEffect(() => {
        if (pat) {
            setDetail({ doctor_id: id, patient_id: authData.userId, name: pat.first_name + ' ' + pat.last_name, age: pat.age, gender: pat.gender, weight: pat.weight, blood_group: pat.blood_group, email: pat.email, phone_number: pat.phone_number, message: '', date: value.toString().substring(4, 15), time: '09:00 AM - 11:00 AM' })
        }
        // eslint-disable-next-line
    }, [pat, id]);

    const handleChange = (value) => {
        setValue(value);
        changeDate(value)
    };

    const changeDate = (e) => {
        setDetail({ ...detail, date: e.toString().substring(4, 15) })
    }

    const onChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };

    const setTime = (e) => {
        setDetail({ ...detail, time: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_HOST}api/book_appointment/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(detail),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Appointment booked successfully:', data);
                setDetail({ doctor_id: id, patient_id: authData.userId, name: pat.first_name + ' ' + pat.last_name, age: pat.age, gender: pat.gender, weight: pat.weight, blood_group: pat.blood_group, email: pat.email, phone_number: pat.phone_number, message: '', date: value.toString().substring(4, 15), time: '09:00 AM - 11:00 AM' })
                // Handle success, maybe show a success message to the user
            })
            .catch(error => {
                console.error('Error booking appointment:', error);
                // Handle error, maybe show an error message to the user
            });
    };

    return (
        <div className={styles.page} >
            <h1>Fill these details to book Appointment with {doc ? doc.first_name + ' ' + doc.last_name : ''} !</h1>
            <form action="">
                <div className={`${styles.flex} ${styles.forms}`}>
                    <div>
                        <div className={`${styles.flex} ${styles.spcBtw} ${styles.flxCol}`}>
                            <div className={`${styles.input} ${styles.left}`}>
                                <label htmlFor="name">Patient's Name</label>
                                <br />
                                <input type="text" id='name' value={detail.name} name='name' onChange={onChange} />
                            </div>
                            <div className={`${styles.input} ${styles.right}`}>
                                <label htmlFor="age">Patient's Age</label>
                                <br />
                                <input pattern="\d*" type="text" id='age' name='age' value={detail.age} onChange={onChange} />
                            </div>
                        </div>
                        <div className={`${styles.flex} ${styles.spcBtw} ${styles.wid} ${styles.flxCol}`}>
                            <div className={`${styles.input}`}>
                                <label htmlFor="gender">Sex</label>
                                <br />
                                <select className={styles.select} value={detail.gender} onChange={onChange} name="gender" id="gender" >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className={`${styles.input}`}>
                                <label htmlFor="weight">Weight</label>
                                <br />
                                <input type="text" id='weight' name='weight' value={detail.weight ? detail.weight : ''} onChange={onChange} />
                            </div>
                            <div className={`${styles.input}`}>
                                <label htmlFor="blood_group">Blood Group</label>
                                <br />
                                <input type="text" id='blood_group' name='blood_group' value={detail.blood_group ? detail.blood_group : ''} onChange={onChange} />
                            </div>
                        </div>
                        <div className={`${styles.flex} ${styles.spcBtw} ${styles.flxCol}`}>
                            <div className={`${styles.input} ${styles.left}`}>
                                <label htmlFor="email">Email Address</label>
                                <br />
                                <input type="text" id='email' name='email' value={detail.email} onChange={onChange} />
                            </div>
                            <div className={`${styles.input} ${styles.right}`}>
                                <label htmlFor="phone_number">Mobile Number</label>
                                <br />
                                <input pattern="\d*" type="text" id='phone_number' name='phone_number' value={detail.phone_number} onChange={onChange} />
                            </div>
                        </div>
                        <div className={`${styles.input} ${styles.issue}`}>
                            <label htmlFor="message">Describe your Problem</label>
                            <br />
                            <input type="text" id='message' name='message' value={detail.message} onChange={onChange} />
                        </div>
                    </div>
                    <div className={styles.cal}>
                        <Calendar onChange={handleChange} value={value} />
                        <div className={`${styles.flex} ${styles.spcBtw} ${styles.flxCol} ${styles.date}`}>
                            <div className={`${styles.input} ${styles.right}`}>
                                <label className={styles.dropdown} htmlFor="time">Time Slot</label>
                                <br />
                                <select className={styles.select} name="time" id="time" onClick={setTime}>
                                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                                    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                                    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                                    <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                                    <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.flex} ${styles.btns}`}>
                    <Link className={styles.link} to='/appointments'><button className={styles.cancel}>Cancel</button></Link>
                    <button onClick={handleSubmit} className={styles.pay}>Proceed to Payment</button>
                </div>
            </form>
        </div>
    )
}

export default BookAppointment
