import React, { useEffect, useState } from 'react'
import styles from '../css/appointment.module.css'
import DoctorCard from './DoctorCard'

const Appointment = () => {
    const [doc, setDoc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/filter?type=2`);
                const data = await response.json();
                setDoc(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.body} >
            <h1><u>Select Your Doctor</u></h1>
            <div className={styles.spc}>
            {doc ? (
                    doc.map((item) => (
                        // <Link key={item.id} to={`/blog/${item.id}`} >
                            <DoctorCard key={item.id} data={item} />
                        //  </Link> 
                    ))
                ) : (
                    <p>No Data available</p>
                )}
            </div>
        </div>
    )
}

export default Appointment
