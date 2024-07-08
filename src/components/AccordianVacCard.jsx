import React from 'react'
import styles from '../css/accordianCard.module.css'

const AccordianVacCard = (props) => {
    return (
        <div className={styles.accordion_item}>
            <div className={`${styles.accordion_header} ${props.activePanel === `panel${props.index}` ? styles.change : ''}`} onClick={() => props.togglePanel(`panel${props.index}`)}>
                <div className={`${styles.head}`}>
                    <h4>{props.num + 1}. {props.data.title ? props.data.title : ''}</h4>
                    <div className={styles.btns}>
                        <p>{props.data.vaccination_date}</p>
                        <i className="fa-solid fa-download"></i>
                        <i className={`fa-solid fa-${props.activePanel === `panel${props.index}` ? 'minus' : 'plus'}`}></i>
                    </div>
                </div>
                <div className={`${styles.accordion_panel} ${props.activePanel === `panel${props.index}` ? styles.active : ''}`} id={`panel${props.index}`}>
                    <div className={styles.subcard}>
                        <div>
                            <p>Vaccination Date: {props.data.vaccination_date}</p>
                            <p>Vaccinatin Time: {props.data.vaccination_time}</p>
                        </div>
                        <p>Next Due Dose: {props.data.next_due_dose}</p>
                    </div>
                    <p className={styles.com}>{props.data.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default AccordianVacCard
