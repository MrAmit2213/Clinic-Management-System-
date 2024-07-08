import React, { useEffect, useState } from 'react'
import styles from '../css/payHistory.module.css'
import { useSelector } from 'react-redux';

const PaymentHistory = () => {
  const authData = useSelector(state => state.Reducer);
  const [his, setHis] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/payment_history/filter?patient_id=${authData.userId}`);
                const data = await response.json();
                setHis(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, [authData]);
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Payment History</h1>
            <div className={styles.page}>
                {his.map((item, index)=>(
                    <div className={`${styles.flex} ${styles.pay}`}>
                        <div className={`${styles.flex} ${styles.num}`}>
                            <span>{index+1}.</span>
                            <span>{item.invoice_no}</span>
                        </div>
                        <div className={`${styles.flex} ${styles.num}`}>
                            <span>{item.date}</span>
                            <span className={styles.down}>
                                <i className="fa-solid fa-download"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentHistory
