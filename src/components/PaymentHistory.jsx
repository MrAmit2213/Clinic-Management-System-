import React from 'react'
import styles from '../css/payHistory.module.css'

const PaymentHistory = () => {
    let i=1;
    return (
        <div className={styles.body}>
            <h1 className={styles.title}>Payment History</h1>
            <div className={styles.page}>
                <div className={`${styles.flex} ${styles.pay}`}>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>{i++}.</span>
                        <span>Invoice No. #6354ABJK</span>
                    </div>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>12/06/2024</span>
                        <span className={styles.down}>
                            <i className="fa-solid fa-download"></i>
                        </span>
                    </div>
                </div>
                <div className={`${styles.flex} ${styles.pay}`}>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>{i++}.</span>
                        <span>Invoice No. #6354ABJK</span>
                    </div>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>12/06/2024</span>
                        <span className={styles.down}>
                            <i className="fa-solid fa-download"></i>
                        </span>
                    </div>
                </div>
                <div className={`${styles.flex} ${styles.pay}`}>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>{i++}.</span>
                        <span>Invoice No. #6354ABJK</span>
                    </div>
                    <div className={`${styles.flex} ${styles.num}`}>
                        <span>12/06/2024</span>
                        <span className={styles.down}>
                            <i className="fa-solid fa-download"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory
