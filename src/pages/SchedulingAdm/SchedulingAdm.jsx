import { IoAlarmOutline, IoCalendarClear, IoCalendarOutline, IoCarSport, IoHome, IoLocationOutline, IoLogoWhatsapp, IoMailOpenOutline, IoPeople, IoPhonePortraitOutline } from "react-icons/io5";
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import ImageHouse from "../../assets/images/house.jpg";
import "./schedulingAdm.css"
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export function SchedulingAdm() {
    const {id} = useParams();
    console.log(id);
    const {data} = useFetch(`/scheduling/${id}`);
    if(data) {
        console.log(data);
    }
    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    return (
        <div className="SchedulingAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="informations">
            <div className="SchedulingProperty">
                    <h2>{data[0].titleProperty}</h2>
                    <div className="textDataHours">
                    <h5><IoCalendarOutline /> {data[0].day}/{data[0].month}/{data[0].year}</h5>
                    <h5><IoAlarmOutline />Horário: {data[0].hour}</h5>
                    <h5><IoLocationOutline />{data[0].location} | {data[0].address}</h5>
                    </div>
                    <div className="dataInfos">
                        <div className="infoUnicScheduling">
                            <p><IoPeople /> Quantidade de pessoas: {data[0].amountOfPeople}</p>
                        </div>
                        <div className="infoUnicScheduling">
                            <p><IoCarSport /> Possui carro? {data[0].ownACar}</p>
                        </div>
                        <div className="infoUnicScheduling">
                            <p><IoHome /> Deseja ver outros imóveis? {data[0].similarProperties}</p>
                        </div>
                    </div>
                    <h4>Cliente:</h4>
                    <div className="client">
                        <div className="infoTop">
                            <div className="image">
                                <img src={data[0].avatarClient} alt={data[0].nameClient} />
                            </div>
                            <h5>{data[0].nameClient}</h5>
                        </div>
                        <h5><IoMailOpenOutline/>{data[0].email}</h5>
                        <h5><IoPhonePortraitOutline/>{data[0].phone}</h5>
                        <h5><IoLogoWhatsapp/>{data[0].whatsapp}</h5>
                    </div>
                    <h4>Imóveis para visita:</h4>
                    <div className="listPropertiesScheduling">
                    <div className="property">
                    <div className="image">
                    <a href={`https://www.suachave.com.br/imovel/${data[0].idProperty} `} target="_blank" rel="noreferrer">
                       <img src={data[0].imageProperty} alt="" />
                       </a>
                    </div>
                    <div className="textProperty">
                        <a href={`https://www.suachave.com.br/imovel/${data[0].idProperty} `} target="_blank" rel="noreferrer">
                    <h4><IoHome /> {data[0].titleProperty}</h4>
                        </a>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}