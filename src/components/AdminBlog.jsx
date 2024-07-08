import React, { useEffect, useState } from 'react'
import styles from '../css/adminBlog.module.css'
import BlogSubHeader from './BlogSubHeader'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import Modal from './Modal';

const getCurrentDateInISOFormat = () => {
    const date = new Date();
    return date.toISOString();
};

const AdminBlog = () => {
    const authData = useSelector(state => state.Reducer);
    const [blog, setBlog] = useState([]);
    const [desc, setDesc] = useState('');
    const [edesc, seteDesc] = useState('');
    const [newBlog, setNewBlog] = useState({ title: '', image: '', description: '', category: '', date: getCurrentDateInISOFormat(), author_id: authData.userId });
    const [edtBlog, setEdtBlog] = useState({ id: '', title: '', image: null, description: '', category: '' });
    const [open, setOpen] = useState(false);
    const [eopen, seteOpen] = useState(false);
    const [del, setDel] = useState(false);
    const [edt, setEdt] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const delClose = () => {
        setDel(false);
    };
    const delOpen = (id) => {
        setDeleteId(id)
        setDel(true);
    };
    const edtClose = () => {
        setEdt(false);
    };

    const edtOpen = () => {
        setEdt(true);
    };

    useEffect(() => {
        setNewBlog(prevState => ({
            ...prevState,
            description: desc
        }));
    }, [desc]);

    useEffect(() => {
        setEdtBlog(prevState => ({
            ...prevState,
            description: edesc
        }));
    }, [edesc]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleeClose = () => {
        seteOpen(false);
    };

    const handleeOpen = (data) => {
        seteOpen(true);
        setEdtBlog({ id: data.id, title: data.title, image: null, description: data.description, category: data.category });
        seteDesc(data.description)
    };

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewBlog({ ...newBlog, [name]: files[0] });
        } else {
            setNewBlog({ ...newBlog, [name]: value });
        }
    }
    const oneChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setEdtBlog({ ...edtBlog, [name]: files[0] });
        } else {
            setEdtBlog({ ...edtBlog, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in newBlog) {
            if (newBlog[key]) {
                formData.append(key, newBlog[key]);
            }
        }

        try {
            const response = await fetch('https://apidoctor.peymagen.com/api/blog/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Blog post created successfully:', data);
            // Optionally reset form fields or provide feedback to the user
            setNewBlog({
                title: '',
                image: null,
                description: '',
                category: '',
                date: getCurrentDateInISOFormat(),
                author_id: authData.userId
            });
            setDesc('');
            handleClose();
        } catch (error) {
            console.error('Error creating blog post:', error);
        }
    };

    const save = async () => {
        try {
            const formData = new FormData();
            for (const key in edtBlog) {
                edtBlog[key] && formData.append(key, edtBlog[key]);
            }
            // for (let pair of formData.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/blog/`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                setEdtBlog({ id: '', title: '', image: null, description: '', category: '' });
                seteDesc('')
                handleeClose();
                edtOpen();
                fetchData();
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await fetch(`https://apidoctor.peymagen.com/api/blog/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted patient from the state
                delClose();
                fetchData();
            } else {
                console.error('Failed to delete patient');
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/blog/`);
            const data = await response.json();
            setBlog(data.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <h1>Blogs</h1>
            </div>
            <Modal title='Add new Blog' isOpen={open} onClose={handleClose}>
                <>
                    <div className={styles.input}>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input type="text" id='title' name='title' value={newBlog.title} onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="image">Image</label>
                        <br />
                        <input type="file" accept="image/*" id='image' name='image' onChange={onChange} required />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="category">Category</label>
                        <br />
                        <input type="text" id='category' name='category' value={newBlog.category} onChange={onChange} required />
                    </div>
                    <div className={styles.input} style={{ height: '160px' }}>
                        <label htmlFor="description">Description</label>
                        <br />
                        <ReactQuill theme='snow'
                            value={desc}
                            style={{ height: '90px' }}
                            placeholder='Description'
                            onChange={setDesc}
                        />
                    </div>
                    <div className={styles.modalBtns}>
                        <button onClick={handleClose} className={styles.cancel}>Cancel</button>
                        <button onClick={handleSubmit} className={styles.addNew}>Add</button>
                    </div>
                </>
            </Modal>
            <div className={`${styles.flex} ${styles.header}`}>
                <BlogSubHeader title='Total Views' change='10%' total='7256k' subtitle='508k sold in a month' />
                <BlogSubHeader title='Followers' change='0.4%' total='105k+' subtitle='Add in one month' />
                <BlogSubHeader title='Likes' change='0.4%' total='1035k' subtitle='Likes in this month' />
                <BlogSubHeader title='Total Views' change='10%' total='7256k' subtitle='508k sold in a month' />
                <BlogSubHeader title='Total Views' change='10%' total='7256k' subtitle='508k sold in a month' />
                <BlogSubHeader title='Total Views' change='10%' total='7256k' subtitle='508k sold in a month' />
                <div className={styles.btns}>
                    <button onClick={handleOpen} className={styles.add}>Add New Blog</button>
                    <button className={styles.target}>Set New Taget</button>
                </div>
            </div>
            <div className={`${styles.flex} ${styles.blogs}`}>
                {blog ? (
                    blog.map((item) => (
                        <div key={item.id}>
                            <div className={styles.butn}>
                                <button onClick={() => { handleeOpen(item) }} className={styles.edt}><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                                <button onClick={() => { delOpen(item.id) }} className={styles.del}><i className="fa-solid fa-trash"></i> Delete</button>
                            </div>
                            <Link to={`/blog/${item.id}`} >
                                <BlogCard bgColor='white' data={item} />
                            </Link>
                            <Modal title='Edit Blog' isOpen={eopen} onClose={handleeClose}>
                                <>
                                    <div className={styles.input}>
                                        <label htmlFor="title">Title</label>
                                        <br />
                                        <input type="text" id='title' name='title' value={edtBlog.title} onChange={oneChange} required />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="image">Change Image</label>
                                        <br />
                                        <input type="file" accept="image/*" id='image' name='image' onChange={oneChange} required />
                                    </div>
                                    <div className={styles.input}>
                                        <label htmlFor="category">Category</label>
                                        <br />
                                        <input type="text" id='category' name='category' value={edtBlog.category} onChange={oneChange} required />
                                    </div>
                                    <div className={styles.input} style={{ height: '160px' }}>
                                        <label htmlFor="description">Description</label>
                                        <br />
                                        <ReactQuill theme='snow'
                                            value={edesc}
                                            style={{ height: '90px' }}
                                            placeholder='Description'
                                            onChange={seteDesc}
                                        />
                                    </div>
                                    <div className={styles.modalBtns}>
                                        <button onClick={handleeClose} className={styles.cancel}>Cancel</button>
                                        <button onClick={save} className={styles.addNew}>Save</button>
                                    </div>
                                </>
                            </Modal>
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
            <Modal isOpen={del} onClose={delClose}>
                <div className={styles.modalItem}>
                    <p>Are you sure you want to delete the item?</p>
                    <div>
                        <button className={styles.cancl} onClick={delClose}>Cancel</button>
                        <button className={styles.sav} onClick={() => { deleteData(deleteId) }}>Delete</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={edt} onClose={edtClose}>
                <div className={styles.modalItem}>
                    <p>Changes has been Saved!</p>
                    <button className={styles.sav} onClick={edtClose}>Ok</button>
                </div>
            </Modal>
        </div>

    )
}

export default AdminBlog
