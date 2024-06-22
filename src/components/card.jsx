import style from "../css/service.module.css";
// import serviceImg from "@/assets/img/symbol.png";
import Image from "next/image";
import data from "@/app/data.json"
import { useRouter } from "next/navigation";

export default function ServiceCard({service, innerRef}) {
  const route = useRouter();
  return (
    <div onClick={() => route.push("/service/"+service?.id) } ref={innerRef} className={style.carsouel_box}>
      <Image
        src={service?.image && data.base_img + service?.image}
        className={style.icon}
        alt="Service"
        width={100}
        height={100}
      />
      <h3 className={style.head}>{service?.title}</h3>
      <p>
        {service?.description}
      </p>
    </div>
  );
}
