import React from 'react'
import styles from '../css/appointment.module.css'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DoctorCard = (props) => {
    const authData = useSelector(state => state.Reducer);
    return (
        <div className={`${styles.flex} ${styles.cardBody}`}>
            <div className={`${styles.flex} ${styles.card}`}>
                <img src={`${props.data.image ? `${process.env.REACT_APP_BACKEND_HOST}${props.data.image}` : "./images/default-profile.jpg"}`} alt="doctor" />
                <div className={`${styles.revFlex} ${styles.detail}`}>
                    <h2>{props.data.first_name+' '+props.data.last_name}</h2>
                    <p>{props.data.department}</p>
                    <p>{props.data.education}</p>
                    <h5>{props.data.experience}</h5>
                </div>
            </div>
            <div className={`${styles.flex} ${styles.btns}`}>
                {authData.user === 'user' ?
                    <Link to={`/bookAppointment/${props.data.id}`} >
                        <button>Select</button>
                    </Link>
                    :
                    <Link to='/login'>
                        <button>Login to Continue</button>
                    </Link>}
            </div>
        </div>
    )
}

export default DoctorCard
