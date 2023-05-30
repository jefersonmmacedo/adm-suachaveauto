import NavbarAdm from "../../components/Nav/Navbar";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import {IoBedOutline, IoCarSportOutline, IoHome, IoHomeOutline, IoLocationOutline , IoBrowsersOutline, IoPhonePortraitOutline, IoEarthOutline, IoCalendarOutline, IoLogoWhatsapp, IoMailOpenOutline, IoPersonOutline} from "react-icons/io5"
import { MdOutlineShower } from "react-icons/md";
import { TbBath, TbBone, TbSofa } from "react-icons/tb";
import "./myMatch.css"
import { useState } from "react";
import { useEffect } from "react";
import apiIpUser from "../../services/api-ipUser";
import { useFetch } from "../../hooks/useFetch";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { ImConnection } from "react-icons/im";
import { CountersMatchProperty } from "../../components/CountersProperties/CountersMatchProperty";

export function MyMatch() {
    const [type, setType] = useState("Alerta")

    const {data} = useFetch(
        type === "Alerta" ? "alertClient" : 
        `searchClient`
        )

    function handleSelectList(data) {
        setType(data);
    }
   
    return (
        <div className="MyMatch">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <h3>Match e Alertas</h3>

                <div className="buttons">
                    <button className={type === "Alerta" ? "Select" : ""} onClick={() => handleSelectList("Alerta")}>Alertas</button>
                    <button className={type === "Search" ? "Select" : ""} onClick={() => handleSelectList("Search")}>Busca de clientes</button>
                </div>
                {/* <h3>{device}</h3> */}
            <div className="MatchList">

                {data?.map((property) => {
                    return (
                <div className="MatchListUnic">
                    <div className="data">
                    <h4>{property.name}</h4>
                    <div className="textDataMatch">
                    <h5><span><IoMailOpenOutline /></span> {property.email}</h5>
                    <h5><span><IoLogoWhatsapp /></span> {property.whatsapp}</h5>
                    </div>
                    <div className="textDataMatch">
                    <h5><span><IoHomeOutline /></span> {property.status} - {property.type} - {property.subType}</h5>
                    <h5><span><IoEarthOutline /></span> {property.district} {property.district === "" ||property.district === undefined ? "" : " - "} {property.city} -  {property.uf}</h5>
                    </div>
                    <div className="icons">
                    <h5><span><IoBedOutline /></span> {property.bedroom}</h5>
                    <h5><span><TbBath /></span> {property.suite}</h5>
                    <h5><span><MdOutlineShower /></span> {property.restroom}</h5>
                    <h5><span><IoCarSportOutline /></span> {property.garage} vagas</h5>
                    <h5><span><TbBone /></span> {property.pets}</h5>
                    <h5><span><TbSofa /></span> {property.furnished}</h5>
                    </div>
                    </div>

                    <div className="counterMatch">
                    <ImConnection />
                                <h6><CountersMatchProperty
                                status={property.status} type={property.type} subType={property.subType}
                                uf={property.uf} city={property.city} district={property.district} 
                                bedroom={property.bedroom} restroom={property.restroom} garage={property.garage}
                                suite={property.suite} pets={property.pets} furnished={property.furnished} 
                                />  Matchs</h6>
                    </div>
                </div>
                    )
                })}
            </div>
            </div>


           



        </div>
    )
}