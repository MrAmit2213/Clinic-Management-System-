import React, { useEffect, useState } from 'react'
import styles from '../css/adminHealthRecord.module.css'
import List from './List'
import Modal from './Modal';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const AdminHealthRecord = () => {
    const [rec, setRec] = useState([]);
    const [user, setUser] = useState([]);
    const [doc, setDoc] = useState([]);
    const [id, setId] = useState('');
    const [docId, setDocId] = useState('');
    const [click, setClick] = useState(false);
    const [clickDoc, setClickDoc] = useState(false);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [trans, setTrans] = useState({ type: '0', patient_id: '', doctor_id: '', report_document: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/filter?type=3`);
                const data = await response.json();
                setUser(data.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/filter?type=2`);
                const data = await response.json();
                setDoc(data.data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, []);

    const filUser = user.filter((im) => {
        let name = im.first_name + ' ' + im.last_name;
        return id.toLowerCase() === '' ? im : name.toLowerCase().includes(id.toLowerCase()) || im.phone_number.toLowerCase().includes(id.toLowerCase());
    });

    const filDoc = doc.filter((im) => {
        let name = im.first_name + ' ' + im.last_name;
        return docId.toLowerCase() === '' ? im : name.toLowerCase().includes(docId.toLowerCase()) || im.phone_number.toLowerCase().includes(docId.toLowerCase());
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/health_record/`);
            const data = await response.json();
            setRec(data.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const data = rec.filter((im) => {
        let docname = im.doctor_first_name + ' ' + im.doctor_last_name;
        let name = im.patient_first_name + ' ' + im.patient_last_name;
        return search.toLowerCase() === '' ? im : name.toLowerCase().includes(search.toLowerCase()) || docname.toLowerCase().includes(search.toLowerCase()) || im.create_on.toLowerCase().includes(search.toLowerCase()) || im.update_on.toLowerCase().includes(search.toLowerCase())
    })

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'report_document' || name === 'image') {
            setTrans({ ...trans, [name]: files[0] });
        } else {
            setTrans({ ...trans, [name]: value });
        }
    };

    const showList = () => {
        setClick(true);
    };
    const showDocList = () => {
        setClickDoc(true);
    };

    const select = (e, userId) => {
        setId(e.target.innerHTML);
        setTrans({ ...trans, patient_id: userId });
        setClick(false);
    };
    const docSelect = (e, userId) => {
        setDocId(e.target.innerHTML);
        setTrans({ ...trans, doctor_id: userId });
        setClickDoc(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in trans) {
            trans[key] && formData.append(key, trans[key]);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/health_record/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data Uploaded successfully:', data);
            handleClose();
            setTrans({ type: '0', patient_id: '', doctor_id: '', report_document: null });
            fetchData();
        } catch (error) {
            console.error('Cannot Upload Data:', error);
            // Display an error message to the user or handle it appropriately
        }
    };

    // const download = async (name) => {
    //     try {
    //         const fileName = name.split('/').pop();
    //         const aTag = document.createElement('a');
    //         aTag.href = `${process.env.REACT_APP_BACKEND_HOST}${name}`;
    //         aTag.setAttribute('download', fileName);
    //         document.body.appendChild(aTag);
    //         aTag.click();
    //         aTag.remove();
    //     } catch (error) {
    //         console.error('Error downloading the file', error);
    //     }
    // };

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <h1>Health records</h1>
                <input placeholder='Search' onChange={(e) => { setSearch(e.target.value) }} type="text" />
            </div>
            <Modal title='Add new Record' isOpen={open} onClose={handleClose}>
                <>
                    <div className={styles.input}>
                        <label htmlFor="id">Patient</label>
                        <br />
                        <input onClick={showList} type="text" id='docId' name='docId' value={id} onChange={(e) => { setId(e.target.value); }} required />
                        <div id="myDropdown" className={`${styles.dropdownContent} ${click && id ? styles.show : ''}`}>
                            {
                                filUser.length > 0 ?
                                    filUser.map((item) => (
                                        <li key={item.id} onClick={(e) => select(e, item.id)}>{item.first_name + ' ' + item.last_name}({item.phone_number})</li>
                                    ))
                                    :
                                    <li>No such user</li>
                            }
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="id">Doctor</label>
                        <br />
                        <input onClick={showDocList} type="text" id='id' name='id' value={docId} onChange={(e) => { setDocId(e.target.value); }} required />
                        <div id="myDocDropdown" className={`${styles.dropdownContent} ${clickDoc && docId ? styles.show : ''}`}>
                            {
                                filDoc.length > 0 ?
                                    filDoc.map((item) => (
                                        <li key={item.id} onClick={(e) => docSelect(e, item.id)}>{item.first_name + ' ' + item.last_name}({item.phone_number})</li>
                                    ))
                                    :
                                    <li>No such user</li>
                            }
                        </div>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="type">Status</label>
                        <br />
                        <select className={styles.formSelect} value={trans.type} onChange={onChange} name="type" id="type" required >
                            <option value="0">Revised</option>
                            <option value="1">Submitted</option>
                        </select>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="report_document">Invoice</label>
                        <br />
                        <input type="file" id='report_document' name='report_document' onChange={onChange} required />
                    </div>
                    <div className={styles.btns}>
                        <button onClick={handleSubmit} className={styles.addNew}>Add</button>
                        <button onClick={handleClose} className={styles.cancel}>Cancel</button>
                    </div>
                </>
            </Modal>
            <div className={styles.add}>
                <div className={styles.sort}>

                </div>
                <div>
                    <button onClick={handleOpen}>Add new Record</button>
                </div>
            </div>
            <List h1='No' h2='Patient' h3='Doctor' h4='Status' h5='Date updated' h6='Date created' >
                {data.length > 0 ? (
                    data.map((detail, index) => (
                        <tr key={detail.id}>
                            <td>{index + 1}.</td>
                            <td>
                                <div className={styles.img}>
                                    <img src={`${detail.patient_image ? `${process.env.REACT_APP_BACKEND_HOST}${detail.patient_image}` : "/images/default-profile.jpg"}`} alt={detail.patient_first_name + ' ' + detail.patient_last_name} />
                                    <span>{detail.patient_first_name + ' ' + detail.patient_last_name}</span>
                                </div>
                            </td>
                            <td>
                                <div className={styles.img}>
                                    <img src={`${detail.doctor_image ? `${process.env.REACT_APP_BACKEND_HOST}${detail.doctor_image}` : "/images/default-profile.jpg"}`} alt={detail.doctor_first_name + ' ' + detail.doctor_last_name} />
                                    {detail.doctor_first_name + ' ' + detail.doctor_last_name}
                                </div>
                            </td>
                            <td>{detail.type + '' === '0' ? 'Revised' : 'Submitted'}</td>
                            <td>{detail.update_on.substring(0, 10)}</td>
                            <td>{detail.create_on.substring(0, 10)}</td>
                            <td className={styles.btn}>
                                <Link to={`${process.env.REACT_APP_BACKEND_HOST}${detail.report_document}`}>
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No data</td>
                    </tr>
                )}
            </List>
        </div>
    )
}

export default AdminHealthRecord
