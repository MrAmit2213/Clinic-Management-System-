import React from 'react'
import styles from '../css/blog.module.css'

const BlogCard = (props) => {
    const dateStr = props.data.date;
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <>
            <div className={styles.card} style={{ backgroundColor: props.bgColor ? props.bgColor : '' }} >
                <img className={styles.mainImg} src={`${process.env.REACT_APP_BACKEND_HOST}${props.data.image}`} alt="dtlImg" />
                <p className={styles.category}>{props.data.category}</p>
                <h4>{props.data.title}</h4>
                <div className={`${styles.flex} ${styles.author}`}>
                    <div className={styles.flex}>
                        <img className={styles.profile} src={`${props.data.author_image ? `${process.env.REACT_APP_BACKEND_HOST}${props.data.author_image}` : './images/default-profile.jpg'}`} alt="a" />
                        <p>{props.data.author_first_name + ' ' + props.data.author_last_name}</p>
                    </div>
                    <p>{formattedDate}</p>
                </div>
            </div>
        </>
    )
}

export default BlogCard
