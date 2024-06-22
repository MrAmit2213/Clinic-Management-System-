import React from 'react'
import styles from '../css/consult.module.css'
import Accordion from './Accordion'

const ConsultationHistory = () => {
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Consultation History</h1>
      <Accordion />
    </div>
  )
}

export default ConsultationHistory
