import React, { useEffect, useState } from 'react';
import styles from '../css/adminTransaction.module.css';
import List from './List';
// import axios from 'axios';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const AdminTransaction = () => {
    const [pay, setPay] = useState([]);
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState('');
    const [id, setId] = useState('');
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const [trans, setTrans] = useState({ invoice_no: '', service_type: '', amount: '', type: '0', date: '', user_id: '', pdf_document: null });

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

    const filUser = user.filter((im) => {
        let name = im.first_name + ' ' + im.last_name;
        return id.toLowerCase() === '' ? im : name.toLowerCase().includes(id.toLowerCase()) || im.phone_number.toLowerCase().includes(id.toLowerCase());
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/payment_history/`);
            const data = await response.json();
            setPay(data.data);
        } catch (error) {
            console.error('Error fetching payment history:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const data = pay.filter((im) => {
        let ent = im.first_name + ' ' + im.last_name;
        return search.toLowerCase() === '' ? im : ent.toLowerCase().includes(search.toLowerCase()) || im.amount.toLowerCase().includes(search.toLowerCase()) || im.date.toLowerCase().includes(search.toLowerCase());
    });

    let success = 0;
    let pending = 0;
    let failed = 0;
    if (pay) {
        for (let index = 0; index < pay.length; index++) {
            if (pay[index].type + '' === '0') {
                success++;
            } else if (pay[index].type + '' === '1') {
                pending++;
            } else {
                failed++;
            }
        }
    }

    // const download = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/payment_history/`, {
    //             responseType: 'blob',
    //         });

    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;

    //         const contentDisposition = response.headers['content-disposition'];
    //         let fileName = 'invoice.pdf';
    //         if (contentDisposition) {
    //             const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    //             if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
    //         }

    //         link.setAttribute('download', fileName);
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     } catch (error) {
    //         console.error('Error downloading the file', error);
    //     }
    // };

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'pdf_document') {
            setTrans({ ...trans, [name]: files[0] });
        } else {
            setTrans({ ...trans, [name]: value });
        }
    };

    const showList = () => {
        setClick(true);
    };

    const select = (e, userId) => {
        setId(e.target.innerHTML);
        setTrans({ ...trans, user_id: userId });
        setClick(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reversedDate = trans.date.split('-').reverse().join('/');
        const formData = new FormData();
        for (const key in trans) {
            if (key === 'date') {
                formData.append(key, reversedDate); // Append reversed date to formData
            } else {
                formData.append(key, trans[key]);
            }
        }

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/payment_history/`, {
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
            fetchData();
            setTrans({ invoice_no: '', service_type: '', amount: '', type: '', date: '', user_id: '', pdf_document: null });
        } catch (error) {
            console.error('Cannot Upload Data:', error);
            // Display an error message to the user or handle it appropriately
        }
    };

    return (
        <div className={`${styles.body}`}>
            <div className={styles.head}>
                <h1>Transactions</h1>
                <input placeholder='Search' onChange={(e) => { setSearch(e.target.value); }} type="text" />
            </div>
            <Modal title='Add new Transaction' isOpen={open} onClose={handleClose}>
                <>
                    <div className={styles.input}>
                        <label htmlFor="id">Patient</label>
                        <br />
                        <input onClick={showList} type="text" id='id' name='id' value={id} onChange={(e) => { setId(e.target.value); }} required />
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
                        <label htmlFor="invoice_no">Invoice No</label>
                        <br />
                        <input type="text" id='invoice_no' name='invoice_no' value={trans.invoice_no} onChange={onChange} required />
                    </div>
                    {/* <div className={styles.input}>
                        <label htmlFor="entities">Entities</label>
                        <br />
                        <input type="text" id='entities' name='entities' value={trans.entities} onChange={onChange} required />
                    </div> */}
                    <div className={styles.input}>
                        <label htmlFor="service_type">Service Type</label>
                        <br />
                        <input type="text" id='service_type' name='service_type' value={trans.service_type} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="amount">Amount</label>
                        <br />
                        <input type="text" id='amount' name='amount' value={trans.amount} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="type">Status</label>
                        <br />
                        <select className={styles.formSelect} value={trans.type} onChange={onChange} name="type" id="type" required >
                            <option value="0">Successful</option>
                            <option value="1">Pending</option>
                            <option value="2">Failed</option>
                        </select>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="date">Date</label>
                        <br />
                        <input type="date" id='date' name='date' value={trans.date} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="pdf_document">Invoice</label>
                        <br />
                        <input type="file" id='pdf_document' name='pdf_document' onChange={onChange} required />
                    </div>
                    <div className={styles.btns}>
                        <button onClick={handleSubmit} className={styles.addNew}>Add</button>
                        <button onClick={handleClose} className={styles.cancel}>Cancel</button>
                    </div>
                </>
            </Modal>
            <div className={styles.add}>
                <div className={styles.number}>
                    <div>
                        <h1>{pay.length}</h1>
                        <h3>Total Transactions</h3>
                    </div>
                    <div>
                        <h1>{success}</h1>
                        <h3>Successful Transactions</h3>
                    </div>
                    <div>
                        <h1>{pending}</h1>
                        <h3>Pending Transactions</h3>
                    </div>
                    <div>
                        <h1>{failed}</h1>
                        <h3>Failed Transactions</h3>
                    </div>
                </div>
                <div>
                    <button onClick={handleOpen}>Add new Transaction</button>
                </div>
            </div>
            <List h1='NO' h2='ENTITIES' h3='SERVICE TYPE' h4='AMOUNT' h5='STATUS' h6='DATE'>
                {data.length > 0 ? (
                    data.map((detail, index) => (
                        <tr key={detail.id}>
                            <td>{index + 1}.</td>
                            <td>{detail.first_name + ' ' + detail.last_name}</td>
                            <td>{detail.service_type}</td>
                            <td>{detail.amount}</td>
                            <td className={`${detail.type + '' === '0' ? styles.green : detail.type + '' === '1' ? styles.yellow : styles.red} ${styles.status}`}>
                                <i className="fa-solid fa-circle"></i>
                                {detail.type + '' === '0' ? 'Successful' : detail.type + '' === '1' ? 'Pending' : 'Failed'}
                            </td>
                            <td>{detail.date}</td>
                            <td className={styles.btn}>
                                <Link to={`${process.env.REACT_APP_BACKEND_HOST}${detail.pdf_document}`}>
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No Data</td>
                    </tr>
                )}
            </List>

        </div>
    )
}
export default AdminTransaction