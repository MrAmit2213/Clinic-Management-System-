import React, { useState } from 'react';
import styles from '../css/bookAppointment.module.css'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookAppointment = () => {
    const [value, setValue] = useState(new Date());
    const [detail, setDetail] = useState({ name: '', age: '', sex: '', weight: '', blood_group: '', email: '', phone_number: '', description: '', date: value.toString().substring(4,15), time: '09:00 AM - 11:00 AM' })
    
    const handleChange = (value) => {
        setValue(value);
        changeDate(value)
    };

    const changeDate = (e)=>{
        setDetail({ ...detail, date: e.toString().substring(4,15) })
    }

    const onChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value });
    };

    const setTime = (e) => {
        setDetail({ ...detail, time: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_BACKEND_HOST}api/book_appointment/`, {
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
            // Handle success, maybe show a success message to the user
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
            // Handle error, maybe show an error message to the user
        });
    };

    return (
        <div className={styles.page} >
            <h1>Fill these details to book Appointment !</h1>
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
                                <label htmlFor="sex">Sex</label>
                                <br />
                                <input type="text" id='sex' name='sex' value={detail.sex} onChange={onChange} />
                            </div>
                            <div className={`${styles.input}`}>
                                <label htmlFor="weight">Weight</label>
                                <br />
                                <input type="text" id='weight' name='weight' value={detail.weight} onChange={onChange} />
                            </div>
                            <div className={`${styles.input}`}>
                                <label htmlFor="blood_group">Blood Group</label>
                                <br />
                                <input type="text" id='blood_group' name='blood_group' value={detail.blood_group} onChange={onChange} />
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
                            <label htmlFor="description">Describe your Problem</label>
                            <br />
                            <input type="text" id='description' name='description' value={detail.description} onChange={onChange} />
                        </div>
                    </div>
                    <div className={styles.cal}>
                        <Calendar onChange={handleChange} value={value} />
                        <div className={`${styles.flex} ${styles.spcBtw} ${styles.flxCol} ${styles.date}`}>
                            <div className={`${styles.input} ${styles.right}`}>
                                <label className={styles.dropdown} htmlFor="time">Time Slot</label>
                                <br />
                                <select name="time" id="time" onClick={setTime}>
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
                    <Link className={styles.link} to='/'><button className={styles.cancel}>Cancel</button></Link>
                    <button onClick={handleSubmit} className={styles.pay}>Proceed to Payment</button>
                </div>
            </form>
        </div>
    )
}

export default BookAppointment
