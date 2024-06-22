import React from 'react'
import styles from '../css/home.module.css'

const Map = (props) => {
  return (
    <div>
      <iframe className={styles.mapFrame} src={props.link} style={{border: '0'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
    </div>
  )
}

export default Map
