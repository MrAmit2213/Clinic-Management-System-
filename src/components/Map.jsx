import React from 'react'
import styles from '../css/home.module.css'

const Map = (props) => {
  const { link } = props;
  if (typeof link !== 'string' || !link.trim()) {
    // If link is not a valid string, return null or a fallback UI
    return null;
  }
  return (
    <div>
      <iframe className={styles.mapFrame} src={link} style={{border: '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
    </div>
  )
}

export default Map
