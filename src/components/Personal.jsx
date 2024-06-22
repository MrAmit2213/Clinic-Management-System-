import React, { useEffect, useState } from 'react'
import styles from '../css/profile.module.css'
import { useSelector } from 'react-redux';


const Personal = () => {
    const authData = useSelector(state => state.Reducer);
    const [editable, setEditable] = useState(false)
    const [profile, setProfile] = useState({ first_name: '', last_name: '', phone_number: '', gender: '', email: '', image: '' });
    const [eprofile, setEprofile] = useState({ name: '', number: '', gender: '', email: '' });
    const [timePassed, setTimePassed] = useState('');

    function calculateTimePassed(date) {
        const now = new Date();
        const pastDate = new Date(date);
        const diffTime = Math.abs(now - pastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
        const diffYears = now.getFullYear() - pastDate.getFullYear();
        const diffMonths = now.getMonth() - pastDate.getMonth() + diffYears * 12;
        const diffFullYears = Math.floor(diffMonths / 12);
        const remainingMonths = diffMonths % 12;
    
        if (diffMonths < 1) return `${diffDays} days ago`;
        if (diffFullYears >= 1) {
            return remainingMonths === 0
                ? `${diffFullYears} years ago`
                : `${diffFullYears} years and ${remainingMonths} months ago`;
        }
        return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
    }

    useEffect(() => {
        setTimePassed(calculateTimePassed(profile['create on']));
    }, [profile]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/${authData.userId}`);
                const data = await response.json();
                setProfile(data.data[0]);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, [authData.userId]);

    useEffect(() => {
        setEprofile({ name: `${profile.first_name} ${profile.last_name}`, gender: profile.gender, number: profile.phone_number, email: profile.email });
    }, [profile]);

    const edit = () => {
        setEditable(true);
    }
    const save = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: authData.userId,
                    first_name: eprofile.name.split(' ')[0],
                    last_name: eprofile.name.substring(eprofile.name.split(' ')[0].length+1),
                    phone_number: eprofile.number,
                    gender: eprofile.gender
                }),
            });
            
            if (response.ok) {
                console.log('Profile updated successfully');
                setEditable(false);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const onChange = (e) => {
        setEprofile({ ...eprofile, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className={styles.sep}></div>
            <div className={`${styles.flex} ${styles.top}`}>
                <div className={`${styles.flex} ${styles.name}`}>
                    <img src={`${profile.image ? `${process.env.REACT_APP_BACKEND_HOST}${profile.image}` : "./images/default-profile.jpg"}`} alt="profile" />
                    <div>
                        <h3>{profile.first_name + ' ' + profile.last_name}</h3>
                        <p>{profile.email}</p>
                    </div>
                </div>
                {editable ?
                    <button onClick={save}>Save</button>
                    :
                    <button onClick={edit}>Edit</button>
                }
            </div>
            <div className={styles.form}>
                <form action="" >
                    <div className={`${styles.flex} ${styles.inputs}`}>
                        <div>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id='name' name='name' placeholder='Full Name' value={eprofile.name} disabled={!editable} onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="number">Mobile Number</label>
                            <input type="text" id='number' name='number' placeholder='Mobile Number' value={eprofile.number} disabled={!editable} onChange={onChange} />
                        </div>
                    </div>
                    <div className={`${styles.flex} ${styles.inputs}`}>
                        <div>
                            <label htmlFor="gender">Gender</label>
                            <select className={styles.select} name="gender" id="gender" value={eprofile.gender} disabled={!editable} onChange={onChange} >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="number">Mobile Number</label>
                            <input type="text" disabled={!editable} />
                        </div>
                    </div>
                    <div className={styles.gap}>
                        <h4>My Email Address</h4>
                        <div className={`${styles.flex} ${styles.email}`}>
                            <i className="fa-solid fa-envelope"></i>
                            <div>
                                <h5>{eprofile.email}</h5>
                                <p>{timePassed}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Personal
