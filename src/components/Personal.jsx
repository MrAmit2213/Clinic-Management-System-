import React, { useEffect, useState } from 'react'
import styles from '../css/profile.module.css'
import { useSelector } from 'react-redux';
import Modal from './Modal';


const Personal = () => {
    const authData = useSelector(state => state.Reducer);
    const [editable, setEditable] = useState(false)
    const [profile, setProfile] = useState({ first_name: '', last_name: '', phone_number: '', gender: '', email: '', image: '', address: '', age: '', blood_group: '' });
    const [eprofile, setEprofile] = useState({ name: '', number: '', gender: '', email: '', address: '', age: '', blood_group: '' });
    const [timePassed, setTimePassed] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

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
        setTimePassed(calculateTimePassed(profile['create_on']));
    }, [profile]);


    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/${authData.userId}`);
            const data = await response.json();
            setProfile(data.data[0]);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [authData.userId]);

    useEffect(() => {
        setEprofile({ name: `${profile.first_name} ${profile.last_name}`, gender: profile.gender, number: profile.phone_number, email: profile.email, address: profile.address, age: profile.age, blood_group: profile.blood_group });
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
                    last_name: eprofile.name.substring(eprofile.name.split(' ')[0].length + 1),
                    phone_number: eprofile.number,
                    gender: eprofile.gender,
                    address: eprofile.address,
                    age: eprofile.age,
                    blood_group: eprofile.blood_group
                }),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                setEditable(false);
                handleClose();
                fetchData();
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
                    <div className={styles.btns}>
                        <button onClick={() => { setEditable(false) }}>Cancel</button>
                        <button onClick={handleOpen}>Save</button>
                    </div>
                    :
                    <button onClick={edit}>Edit</button>
                }
            </div>
            <div className={styles.form}>
                <Modal isOpen={open} onClose={handleClose}>
                    <div className={styles.modalItem}>
                        <p>Are you sure you want to save the changes?</p>
                        <div>
                            <button className={styles.cancel} onClick={handleClose}>No</button>
                            <button className={styles.save} onClick={save}>Save</button>
                        </div>
                    </div>
                </Modal>
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
                            <label htmlFor="age">Age</label>
                            <input type="text" name='age' id='age' value={eprofile.age} placeholder='Age' disabled={!editable} onChange={onChange} />
                        </div>
                    </div>
                    <div className={`${styles.flex} ${styles.inputs}`}>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input type="text" id='address' name='address' placeholder='Address' value={eprofile.address} disabled={!editable} onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="blood_group">Blood Group</label>
                            <input type="text" id='blood_group' name='blood_group' placeholder='Blood Group' value={eprofile.blood_group} disabled={!editable} onChange={onChange} />
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
