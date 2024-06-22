import React from 'react'
import styles from '../css/accordianCard.module.css'

const AccordionCard = (props) => {
    return (
        <div className={styles.accordion_item}>
            <div className={`${styles.accordion_header} ${props.activePanel === `panel${props.index}` ? styles.change : ''}`} onClick={() => props.togglePanel(`panel${props.index}`)}>
                <div className={`${styles.head}`}>
                    <h4>{props.data.title?props.data.title:''}</h4>
                    <i className={`fa-solid fa-${props.activePanel === `panel${props.index}` ? 'minus' : 'plus'}`}></i>
                </div>
                <div className={`${styles.accordion_panel} ${props.activePanel === `panel${props.index}` ? styles.active : ''}`} id={`panel${props.index}`}>
                    {props.data.description?props.data.description:''}
                </div>
            </div>
        </div>
    )
}

export default AccordionCard
