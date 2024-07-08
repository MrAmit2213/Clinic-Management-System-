import React, { useEffect, useState } from 'react'
import styles from '../css/blogPage.module.css'
import BlogCard from './BlogCard';
import { Link, useParams } from 'react-router-dom';

const BlogPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/blog/${id}/`);
                const data = await response.json();
                setItem(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setError('Error fetching blog data');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledBlog = shuffleArray([...blogs]).slice(0, 4);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/blog/`);
                const data = await response.json();
                setBlogs(data.data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const blog = item[0];

    return (
        <div className={styles.page}>
            <div className={styles.blog}>
                <h1>{blog.title} :</h1>
                <img src={`${process.env.REACT_APP_BACKEND_HOST}${blog.image}`} alt="blog" />
                <p dangerouslySetInnerHTML={{ __html: blog.description}}></p>
            </div>
            <div className={styles.similar}>
                <h1>Similar Blogs</h1>
                <div className={`${styles.flex} ${styles.simBody}`}>
                    {shuffledBlog.map((item) => (
                        <Link key={item.id} to={`/blog/${item.id}`} >
                            <BlogCard data={item} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogPage
