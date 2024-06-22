import React, { useEffect, useState } from 'react'
import styles from '../css/adminTransaction.module.css'
import List from './List'

const AdminTransaction = () => {
    const [pay, setPay] = useState([]);
    const [search, setSearch] = useState('');

    let success = 0;
    let pending = 0;
    let failed = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/payment_history/`);
                const data = await response.json();
                setPay(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, []);

    if (pay) {
        for (let index = 0; index < pay.length; index++) {
            if (pay[index].status.toLowerCase() === 'successful') {
                success++;
            }
            else if (pay[index].status.toLowerCase() === 'pending') {
                pending++;
            }
            if (pay[index].status.toLowerCase() === 'failed') {
                failed++;
            }
        }
    }
    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <h1>Transactions</h1>
                <input placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}} type="text" />
            </div>
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
                    <button>Add new Transaction</button>
                </div>
            </div>
            <List data={pay} search={search} h1='NO' h2='ENTITIES' h3='SERVICE TYPE' h4='AMOUNT' h5='STATUS' h6='DATE' />
        </div>
    )
}

export default AdminTransaction
