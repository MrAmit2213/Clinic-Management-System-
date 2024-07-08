import React, { useState } from 'react';
import styles from '../css/accordianCard.module.css';
import AccordionCard from './AccordionCard';
import { useLocation } from 'react-router-dom';
import AccordianVacCard from './AccordianVacCard';

const Accordion = (props) => {
  const location = useLocation();
  const address = location.pathname;
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className={styles.body}>
      <div className={styles.accordion}>
        {props.data ?
          props.data.map((item, index) => (
            address === '/profile/vacinationHistory' ?
              <AccordianVacCard key={item.id} data={item} togglePanel={togglePanel} activePanel={activePanel} num={index} index={item.id} />
              :
              <AccordionCard key={item.id} data={item} togglePanel={togglePanel} activePanel={activePanel} num={index} index={item.id} />
          ))
          :
          <p>No Data Available</p>
        }
      </div>
    </div>
  );
}

export default Accordion;
