import React, {  useState } from 'react';
import styles from '../css/accordianCard.module.css';
import AccordionCard from './AccordionCard';

const Accordion = (props) => {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  
  return (
    <div className={styles.body}>
      <div className={styles.accordion}>
        {props.data?
            props.data.map((item)=>(
              <AccordionCard key={item.id} data={item} togglePanel={togglePanel} activePanel={activePanel} index={item.id} />
            ))
            :
            <p>No Data Available</p>
      }
      </div>
    </div>
  );
}

export default Accordion;
