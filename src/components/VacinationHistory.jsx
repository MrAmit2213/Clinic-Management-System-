import React from 'react'
import styles from '../css/consult.module.css'
import Accordion from './Accordion'

const VacinationHistory = () => {
    return (
        <div className={styles.body}>
          <h1 className={styles.title}>Vacination History</h1>
          <Accordion />
        </div>
      )
}

export default VacinationHistory
