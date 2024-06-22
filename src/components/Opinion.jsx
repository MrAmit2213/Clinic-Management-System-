import style from '../css/service.module.css'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import OpinionCard from "./OpinionCard";

export default function Opinion(props) {
  const ref = useRef(null);
  const refs = useRef(null);
  const efs = useRef(null);
  const [service, setService] = useState(null);

  const getData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}api/patient_opinion/`).then((res) => res.data);
    if (response.success) setService(response.data);
  }

  useEffect(() => {
    getData();
  }, [])

  const btnpressprev = () => {
    const singleBox = refs.current;
    const styleBox = window.getComputedStyle(singleBox);
    if (ref.current) {
      ref.current.scrollLeft = ref.current.scrollLeft - (parseInt(styleBox.width, 10) + parseInt(window.getComputedStyle(ref.current).gap, 10));
    }
  };

  const btnpressnext = () => {
    const singleBox = refs.current;
    const styleBox = window.getComputedStyle(singleBox);
    if (ref.current) {
      console.log();
      ref.current.scrollLeft = ref.current.scrollLeft + (parseInt(styleBox.width, 10) + parseInt(window.getComputedStyle(ref.current).gap, 10));
    }
  };

  return (
    <div>
      <div className={`${style.container} ${props.layout === "component" && style.blue_bg}`}>
        <div className={style.btns}>
          <h1 className={style.header}>Hear our Patient's opinions</h1>
          <div>
            <i className="fa-solid fa-arrow-left" onClick={btnpressprev}></i>
            <i className="fa-solid fa-arrow-right" onClick={btnpressnext}></i>
          </div>
        </div>
        <div ref={ref} className={style.carsouel_container}>
          {service?.map((data, index) => <OpinionCard data={data} innerRef={index === 0 ? refs : efs} key={index} />)}
        </div>
        <div className={`${style.btns} ${style.mobBtns}`}>
            <i className="fa-solid fa-arrow-left" onClick={btnpressprev}></i>
            <i className="fa-solid fa-arrow-right" onClick={btnpressnext}></i>
        </div>
      </div>
    </div>
  );
}
