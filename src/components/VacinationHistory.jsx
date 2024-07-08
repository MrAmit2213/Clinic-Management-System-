import React, { useEffect, useState } from 'react'
import styles from '../css/consult.module.css'
import Accordion from './Accordion'
import { useSelector } from 'react-redux';

const VacinationHistory = () => {
  const authData = useSelector(state => state.Reducer);
  const [his, setHis] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/vaccination_history/filter?patient_id=${authData.userId}`);
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
          <h1 className={styles.title}>Vacination History</h1>
          <Accordion data={his} />
        </div>
      )
}

export default VacinationHistory
