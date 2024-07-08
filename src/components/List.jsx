import React from 'react'
import styles from '../css/list.module.css'

const List = (props) => {
    // const handleDownload = (name) => {
    //     fetch(`${process.env.REACT_APP_BACKEND_HOST}${name}`, {
    //         mode: "no-cors",

    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json",
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //     })
    //         .then(response => {
    //             console.log(response);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.blob();
    //         })
    //         .then((blob) => {
    //             const url = window.URL.createObjectURL(new Blob([blob]));
    //             console.log(url)
    //             const link = document.createElement("a");
    //             link.href = url;
    //             link.download = "doc.jpg";
    //             console.log(link)
    //             document.body.appendChild(link);

    //             link.click();

    //             document.body.removeChild(link);
    //             window.URL.revokeObjectURL(url);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching the file:", error);
    //         });
    // };
    // const handleDownload = (name) => {
    //     const pdfUrl = `${process.env.REACT_APP_BACKEND_HOST}${name}`;
    //     const link = document.createElement('a');
    //     link.href = pdfUrl;
    //     link.download = 'document.pdf'; // You can customize the filename here
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };
    return (
        <div className={styles.body}>
            <table cellSpacing='0'>
                <thead className={styles.table}>
                    <tr>
                        <th>{props.h1}</th>
                        <th>{props.h2}</th>
                        <th>{props.h3}</th>
                        <th>{props.h4}</th>
                        <th>{props.h5}</th>
                        <th>{props.h6}</th>
                        <th>{props.h7}</th>
                    </tr>
                </thead>

                <tbody>
                    {props.children}
                </tbody>
            </table>
        </div>
    )
}

export default List
