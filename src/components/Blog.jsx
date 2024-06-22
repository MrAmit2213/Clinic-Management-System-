import React, { useEffect, useState } from 'react'
import styles from '../css/blog.module.css'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom';

const Blog = () => {
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/blog/`);
                const data = await response.json();
                setBlog(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.page}>
            <h1>Latest Blogs</h1>
            <div className={`${styles.flex} ${styles.blogs}`}>
                {blog ? (
                    blog.map((item) => (
                        <Link key={item.id} to={`/blog/${item.id}`} >
                            <BlogCard data={item} />
                        </Link>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
        </div>
    );
}

export default Blog
