import React from 'react'
import styles from '../css/opinion.module.css'

const OpinionCard = (props) => {
    const ratting = props.data.ratting;
    const rate = [];
    const unrate = [];
    let i,j;
    for (i = 0; i < ratting; i++) {
        rate.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (j = 0; j < (5-ratting); j++) {
        unrate.push(<i key={i+j+1} className="fa-regular fa-star"></i>);
    }

    return (
        <div ref={props.innerRef}  className={`${styles.card}`}>
            <img src={`${process.env.REACT_APP_BACKEND_HOST}${props.data.image}`} alt="patient" />
            <div className={styles.subCard}>
                <p className={styles.desc}>{props.data.description}</p>
                <div className={styles.foot}>
                    <div>
                        <h3>{props.data.first_name+' '+props.data.last_name}</h3>
                        <p className={styles.desig}>{props.data.type==='1'?'Patient':''}</p>
                    </div>
                    <div className={styles.rating}>
                        {rate}
                        {unrate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpinionCard
