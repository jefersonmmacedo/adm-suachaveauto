import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import "./scheduling.css";
import {IoCalendar, IoAlarmOutline, IoCalendarOutline, IoLocationOutline, IoBusinessOutline} from 'react-icons/io5';
import { ToolBarClient } from "../../components/ToolBarClient/ToolBarClient";
import ImageHouse from "../../assets/images/house.jpg";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { PropertyUnicBlock } from "../../components/PropertyUnicBlock/PropertyUnicBlock";

export function Scheduling() {
    const {id} = useParams() 

    const {data} = useFetch(`/scheduling/${id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    return (
        <div className="Scheduling">
            <Navbar2 />
            <div className="main">
                <ToolBarClient />
                <div className="textScheduling">
                <div className="SchedulingProperty">
                    <h2 className="h2"><IoCalendarOutline />{data[0].titleProperty}</h2>
                    <div className="textDataHours">
                    <h5 className="h5"><IoCalendarOutline /> {data[0].day}/{data[0].month}/{data[0].year}</h5>
                    <h5 className="h5"><IoAlarmOutline />{data[0].hour}</h5>
                    <h5 className="h5"><IoBusinessOutline /> {data[0].location}</h5>
                    <h5 className="h5"><IoLocationOutline /> {data[0].address}</h5>
                    </div>
                    <div className="dataInfos">
                        <div className="infoUnicScheduling">
                            <p className="p">Quantidade de pessoas:  {data[0].amountOfPeople}</p>
                        </div>
                        <div className="infoUnicScheduling">
                            <p className="p">Possui carro?  {data[0].ownACar}</p>
                        </div>
                        <div className="infoUnicScheduling">
                            <p className="p">Deseja ver outros imóveis?  {data[0].similarProperties}</p>
                        </div>
                    </div>
                    <h4 className="h4">Imóveis para visita:</h4>
                    <div className="listPropertiesScheduling">
                        <PropertyUnicBlock id={data[0].idProperty}/>
                    </div>
                </div>
                </div>
            </div>

                <Footer />
        </div>
    )
}