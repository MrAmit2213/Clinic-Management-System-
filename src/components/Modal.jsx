import React, { useEffect } from "react";
import styles from '../css/modal.module.css'

const Modal = (props) => {

    useEffect(() => {
        if (props.isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [props.isOpen]);

    if (!props.isOpen) return null;

    return (
        <div className={styles.body} onClick={props.onClose} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.title}>
                    <h2>{props.title}</h2>
                </div>
                {props.children}
            </div>
        </div>
    );
};

export default Modal;