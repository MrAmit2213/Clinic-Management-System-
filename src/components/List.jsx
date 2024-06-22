import React from 'react'
import styles from '../css/list.module.css'

const List = (props) => {
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data ?
                        props.data.filter((im) => {
                            return props.search.toLowerCase() === '' ? im : im.entities.toLowerCase().includes(props.search.toLowerCase())
                        }).map((pay, index) => (
                            <tr key={pay.id}>
                                <td>{index + 1}.</td>
                                <td>{pay.entities}</td>
                                <td>{pay.service_type}</td>
                                <td>{pay.amount}</td>
                                <td className={`${pay.status.toLowerCase() === 'successful' ? styles.green : pay.status.toLowerCase() === 'pending' ? styles.yellow : styles.red} ${styles.status}`}>
                                    <i className="fa-solid fa-circle"></i>
                                    {pay.status}
                                </td>
                                <td>{pay.date}</td>
                                <td className={styles.btn}>
                                    <i className="fa-solid fa-download"></i>
                                </td>
                            </tr>
                        )) :
                        <p>No Data Available</p>
                    }
                    {/* <tr>
                        <td>ghfhf</td>
                        <td>ghfhf</td>
                        dangerouslySetInnerHTML={{ __html: ex }}
                        <td>ghfhf</td>
                        <td>ghfhf</td>
                        <td>ghfhf</td>
                        <td>ghfhf</td>
                        <td><i className="fa-solid fa-download"></i></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default List
