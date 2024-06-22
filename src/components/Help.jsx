import React, { useEffect, useState } from 'react'
import styles from '../css/consult.module.css'
import Accordion from './Accordion'

const Help = () => {
  const [faq, setFaq] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/faqs/`);
                const data = await response.json();
                setFaq(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>FAQs</h1>
      <Accordion data={faq} />
    </div>
  )
}

export default Help