// src/App.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Sample = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        // const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}api/best_care/`);
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const result = await response.json();
        // setData(result);
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/best_care/`).then(res => {
          setData(res.data);
        });
      } catch (error) {
      }
    };

    // Call the function to fetch data
    fetchData();
  }, []);


  const item = data && data.success && data.data.length > 0 ? data.data[0] : null;

  return (
    <div>
      <h1>API Data</h1>
      {item &&
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
          <h2>{item.title}</h2>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Message One:</strong> {item.message_one}</p>
          <p><strong>Message Two:</strong> {item.message_two}</p>
          <img src={`${process.env.REACT_APP_BACKEND_HOST}${item.image}`} alt={item.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          <p><strong>Created on:</strong> {new Date(item['create on']).toLocaleString()}</p>
          <p><strong>Updated on:</strong> {new Date(item['update on']).toLocaleString()}</p>
        </div>
        }
    </div>
  );
};

export default Sample;
