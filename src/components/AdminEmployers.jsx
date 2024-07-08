import React, { useEffect, useState } from 'react'
import styles from '../css/adminEmployers.module.css'
import List from './List'
import Modal from './Modal';

const AdminEmployers = () => {
    const [emp, setEmp] = useState([]);
    const [fil, setFil] = useState({ department: '', status: '' });
    const [open, setOpen] = useState(false);
    const [eopen, seteOpen] = useState(false);
    const [trans, setTrans] = useState({ first_name: '', last_name: '', email: '', phone_number: '', department: '', type: '2', status: '0', image: null, password: '' });
    const [etrans, seteTrans] = useState({ id: '', first_name: '', last_name: '', email: '', phone_number: '', department: '', status: '', image: null });
    const [del, setDel] = useState(false);
    const [edt, setEdt] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const delClose = () => {
        setDel(false);
    };
    const delOpen = (id) => {
        setDeleteId(id)
        setDel(true);
    };
    const edtClose = () => {
        setEdt(false);
    };

    const edtOpen = () => {
        setEdt(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleeClose = () => {
        seteOpen(false);
    };

    const handleeOpen = (data) => {
        seteOpen(true);
        seteTrans({ id: data.id, first_name: data.first_name, last_name: data.last_name, email: data.email, phone_number: data.phone_number, department: data.department, status: data.status, image: null });
    };
    const oneChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            seteTrans({ ...etrans, [name]: files[0] });
        } else {
            seteTrans({ ...etrans, [name]: value });
        }
    };

    const save = async () => {
        try {
            const formData = new FormData();
            for (const key in etrans) {
                etrans[key] && formData.append(key, etrans[key]);
            }
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                seteTrans({ id: '', first_name: '', last_name: '', email: '', phone_number: '', department: '', status: '', image: null });
                handleeClose();
                edtOpen();
                fetchData();
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/filter?type=2&status=${fil.status}&department=${fil.department}`);
            const data = await response.json();
            setEmp(data.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [fil]);

    const Change = (e) => {
        setFil({ ...fil, [e.target.name]: e.target.value });
    }

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'action_pdf' || name === 'image') {
            setTrans({ ...trans, [name]: files[0] });
        } else {
            setTrans({ ...trans, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append each field from trans to formData if it's not empty
        for (const key in trans) {
            if (trans[key] !== '') {
                formData.append(key, trans[key]);
            }
        }
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/user/`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Network response was not ok');
            }
    
            // Reset form fields and fetch updated data
            console.log('Data Uploaded successfully');
            handleClose();
            setTrans({ first_name: '', last_name: '', email: '', phone_number: '', type: '2', department: '', status: '0', image: null, password: '' });
            fetchData();
        } catch (error) {
            console.error('Cannot Upload Data:', error);
            // Display an error message to the user or handle it appropriately
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch(`https://apidoctor.peymagen.com/api/user/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted patient from the state
                delClose();
                fetchData();
            } else {
                console.error('Failed to delete patient');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    // const data = emp.filter((im) => {
    // return fil.status.toLowerCase() === '' ? im : im.status.toLowerCase().includes(fil.status.toLowerCase()) && im.department.toLowerCase().includes(fil.department.toLowerCase())
    // if (fil.status.toLocaleLowerCase()==='' && fil.department.toLocaleLowerCase()==='') {
    // return im;
    // }
    // else if(){

    // }
    // })

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <h1>Employees</h1>
            </div>
            <Modal title='Add new Employee' isOpen={open} onClose={handleClose}>
                <>
                    <div className={styles.input}>
                        <label htmlFor="first_name">First Name</label>
                        <br />
                        <input type="text" id='first_name' name='first_name' value={trans.first_name} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="last_name">Last Name</label>
                        <br />
                        <input type="text" id='last_name' name='last_name' value={trans.last_name} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="email">E-mail</label>
                        <br />
                        <input type="text" id='email' name='email' value={trans.email} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="phone_number">Phone Number</label>
                        <br />
                        <input type="text" id='phone_number' name='phone_number' value={trans.phone_number} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="department">Department</label>
                        <br />
                        <input type="text" id='department' name='department' value={trans.department} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="status">Status</label>
                        <br />
                        <select className={styles.formSelect} value={trans.status} onChange={onChange} name="status" id="status" >
                            <option value="0">Part-Time</option>
                            <option value="1">Full-Time</option>
                        </select>
                    </div>
                    {/* <div className={styles.input}>
                        <label htmlFor="image">Image</label>
                        <br />
                        <input type="file" id='image' name='image' accept="image/*" onChange={onChange} required />
                    </div> */}
                    <div className={styles.input}>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="text" id='password' name='password' value={trans.password} onChange={onChange} required />
                    </div>
                    <div className={styles.btns}>
                        <button onClick={handleSubmit} className={styles.addNew}>Save</button>
                        <button onClick={handleClose} className={styles.cancel}>Cancel</button>
                    </div>
                </>
            </Modal>
            <div className={styles.add}>
                <div className={styles.sort}>
                    <div>
                        Status: <select className={styles.select} value={fil.status} onChange={Change} name="status" id="status" >
                            <option value="">All</option>
                            <option value="1">Full Time</option>
                            <option value="0">Part Time</option>
                        </select>
                    </div>
                    <div>
                        Department: <select className={styles.select} value={fil.department} onChange={Change} name="department" id="department" >
                            <option value="">All</option>
                            <option value="Internal_medicine">Internal medicine</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button onClick={handleOpen}>Add new Employee</button>
                </div>
            </div>
            <List h1='No' h2='Name' h3='Email Address' h4='Phone' h5='Department' h6='Status' h7='Actions' >
                {emp.length>0 ? (
                    emp.map((detail, index) => (
                        <tr key={detail.id}>
                            <Modal title='Edit Employee' isOpen={eopen} onClose={handleeClose}>
                                <>
                                    <div className={styles.input}>
                                        <label htmlFor="first_name">First Name</label>
                                        <br />
                                        <input type="text" id='first_name' name='first_name' value={etrans.first_name} onChange={oneChange} />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="last_name">Last Name</label>
                                        <br />
                                        <input type="text" id='last_name' name='last_name' value={etrans.last_name} onChange={oneChange} />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="email">E-mail</label>
                                        <br />
                                        <input type="text" id='email' name='email' value={etrans.email} onChange={oneChange} />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="phone_number">Phone Number</label>
                                        <br />
                                        <input type="text" id='phone_number' name='phone_number' value={etrans.phone_number} onChange={oneChange} />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="department">Department</label>
                                        <br />
                                        <input type="text" id='department' name='department' value={etrans.department} onChange={oneChange} />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="status">Status</label>
                                        <br />
                                        <select className={styles.formSelect} value={etrans.status} onChange={oneChange} name="status" id="status" >
                                            <option value="0">Part-Time</option>
                                            <option value="1">Full-Time</option>
                                        </select>
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="image">New Image</label>
                                        <br />
                                        <input type="file" id='image' name='image' accept="image/*" onChange={oneChange} />
                                    </div>
                                    <div className={styles.btns}>
                                        <button onClick={() => { save() }} className={styles.addNew}>Add</button>
                                        <button onClick={handleeClose} className={styles.cancel}>Cancel</button>
                                    </div>
                                </>
                            </Modal>
                            <td>{index + 1}.</td>
                            <td className={styles.img}>
                                <img src={`${detail.image ? `${process.env.REACT_APP_BACKEND_HOST}${detail.image}` : "/images/default-profile.jpg"}`} alt={detail.name} />
                                {detail.first_name + ' ' + detail.last_name}
                            </td>
                            <td>{detail.email}</td>
                            <td>{detail.phone_number}</td>
                            <td>{detail.department}</td>
                            <td className={`${styles.status}`}>
                                {detail.status + '' === '0' ? 'Part-Time' : detail.status + '' === '1' ? 'Full-Time' : ''}
                            </td>
                            <td className={styles.btn}>
                                <i onClick={() => { handleeOpen(detail) }} className="fa-solid fa-pen-to-square"></i>
                                <i onClick={() => { delOpen(detail.id) }} className="fa-solid fa-trash"></i>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No Data</td>
                    </tr>
                )}
            </List>
            <Modal isOpen={del} onClose={delClose}>
                <div className={styles.modalItem}>
                    <p>Are you sure you want to delete the item?</p>
                    <div>
                        <button className={styles.cancel} onClick={delClose}>Cancel</button>
                        <button className={styles.save} onClick={() => { deleteData(deleteId) }}>Delete</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={edt} onClose={edtClose}>
                <div className={styles.modalItem}>
                    <p>Changes has been Saved!</p>
                    <button className={styles.save} onClick={edtClose}>Ok</button>
                </div>
            </Modal>
        </div>
    )
}

export default AdminEmployers
