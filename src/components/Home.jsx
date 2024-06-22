import React, { useEffect, useState } from 'react'
import styles from '../css/home.module.css'
import Map from './Map'
import axios from 'axios';
import Opinion from './Opinion';
import { Link } from 'react-router-dom';

const Home = () => {
  const [home3, setHome3] = useState([]);
  const [home1, setHome1] = useState([]);
  const [services, setServices] = useState([]);
  const [whyImg, setWhyImg] = useState([]);
  const [why, setWhy] = useState([]);
  const [map, setMap] = useState([]);

  useEffect(() => {
    const fetchHome3 = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/best_care/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setHome3(result);
      } catch (error) {
      }
    };

    const fetchHome1 = async () => {

      axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/services/`).then(res => {
        setServices(res.data.data);
      });

      axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/why_us/`).then(res => {
        setWhy(res.data.data);
      });

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/home/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setHome1(result);
      } catch (error) {
        console.log('error')
      }
    };
    const fetchWhyImg = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/photo_only_why_us/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setWhyImg(result);
      } catch (error) {
        console.log('error')
      }
    };
    const fetchMap = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/reach_us/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setMap(result);
      } catch (error) {
        console.log('error')
      }
    };

    // Call the function to fetch data
    fetchHome3();
    fetchHome1();
    fetchWhyImg();
    fetchMap();
  }, []);

  const home3Data = home3 && home3.success && home3.data.length > 0 ? home3.data[0] : null;
  const home1Data = home1 && home1.success && home1.data.length > 0 ? home1.data[0] : null;
  const img = whyImg && whyImg.success && whyImg.data.length > 0 ? whyImg.data[0] : null;
  const link = map && map.success && map.data.length > 0 ? map.data[0] : null;

  return (
    <div className={styles.home}>
      <section>
        {
          home1Data &&
          <div className={`${styles.flex} ${styles.home1}`}>
            <div>
              <h1>{home1Data.title}</h1>
              <p>{home1Data.description}</p>
              <h2>{home1Data.doctor_name}</h2>
              <h5>{home1Data.sub_category}</h5>
              <Link to='/appointments'>
                <span className={`${styles.flex} ${styles.btn}`}>
                  <h6>Book Appointment</h6>
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </Link>
            </div>
            <div className={styles.adjust} >
              <img src={`${process.env.REACT_APP_BACKEND_HOST}${home1Data.image}`} alt="doc" />
            </div>
          </div>
        }
        <div className={`${styles.flex} ${styles.allService}`}>
          {services.map((item) => (
            <div key={item.id} className={`${styles.flex} ${styles.service}`}>
              <img src={`${process.env.REACT_APP_BACKEND_HOST}${item.image}`} alt="service" />
              <span>
                <h4>{item.title}</h4>
                <p>{item.description}</p></span>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.flex} ${styles.home2}`}>
        {
          img &&
          <div className={styles.adjust}>
            <img className={`${styles.img}`} src={`${process.env.REACT_APP_BACKEND_HOST}${img.image}`} alt="home2" />
          </div>
        }
        <div className={`${styles.revFlex} ${styles.reason}`}>
          <h1>Why Us</h1>
          {why.map((item) => (
            <div key={item.id} className={styles.flex}>
              <span className={styles.adjust}>
                <img src={`${process.env.REACT_APP_BACKEND_HOST}${item.image}`} alt="svg" />
              </span>
              <span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </span>
            </div>
          ))}
        </div>
      </section>
      {home3Data &&
        <section className={`${styles.flex} ${styles.home3}`}>
          <div className={styles.left}>
            <h1>{home3Data.title}</h1>
            <p>{home3Data.description}</p>
            <span className={styles.check}>
              <i className="fa-solid fa-check"></i>
              <p>{home3Data.message_one}</p>
            </span>
            <span className={styles.check}>
              <i className="fa-solid fa-check"></i>
              <p>{home3Data.message_two}</p>
            </span>
            <Link to='/appointments'>
              <span className={`${styles.flex} ${styles.btn}`}>
                <h6>Check Availability</h6>
                <i className="fa-solid fa-angle-right"></i>
              </span>
            </Link>
          </div>
          <div className={styles.adjust}>
            <img src={`${process.env.REACT_APP_BACKEND_HOST}${home3Data.image}`} alt="doc" />
          </div>
        </section>
      }
      <section className={styles.opinion}>
        <Opinion />
      </section>
      <section className={styles.map}>
        <h1>How to reach us</h1>
        {link && <Map link={link.map} />}
      </section>
    </div>
  )
}

export default Home
