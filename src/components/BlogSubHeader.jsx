import React from 'react'
import styles from '../css/adminBlog.module.css'

const BlogSubHeader = (props) => {
    return (
        <div className={styles.subHeader}>
            <div className={`${styles.flex} ${styles.arrow}`}>
                <p>{props.title}</p>
                <div>
                    <i className="fa-solid fa-arrow-up"></i>
                    <span>{props.change}</span>
                </div>
            </div>
            <h2>{props.total}</h2>
            <p>{props.subtitle}</p>
        </div>
    )
}

export default BlogSubHeader
