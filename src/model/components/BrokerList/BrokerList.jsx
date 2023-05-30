import "./brokerList.css";
import {FaBed, FaShower, FaCar} from 'react-icons/fa';
import {IoCallOutline, IoLogoWhatsapp, IoMailOutline, IoGlobeOutline, IoLocationOutline} from 'react-icons/io5'
import imobiliária from "../../assets/images/corretor1.jpg";
import imobiliária2 from "../../assets/images/corretor2.jpg";
import imobiliária3 from "../../assets/images/corretor3.jpg";
import { useEffect } from "react";
import api from "../../services/api";
import { useState } from "react";

export function BrokerList() {
    const [broker, setBroker] = useState([]);
    const type = "Corretor";
    useEffect(() => {
        async function broketLoad() {
            await api.get(`/company/${type}`).then((res) => {
                console.log(res.data);
                setBroker(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }

        broketLoad()
    },[])
    return (
        <div className="BrokerList">
            <div className="searchBrokers">
                <input type="text" placeholder="Busque pelo nome"/>
                <select name="" id="">
                    <option value="">Individual</option>
                    <option value="">De imobiliária</option>
                </select>
                <select name="" id="">
                    <option value="">Estado</option>
                </select>
                <select name="" id="">
                    <option value="">Cidade</option>
                </select>
            </div>

            <div className="listBroker">
            
            {broker.map((broker) => {
                return (
            <div className="BrokerUnicFavorite">
                    <div className="image">
                    <img src={broker.logo} alt="" />
                    </div>
                    <div className="text">
                    <h3>{broker.fantasyName}</h3>
                    <h5><IoLocationOutline />{broker.road}, Nº {broker.number}, {broker.district} - {broker.city} - {broker.uf}</h5>
                    <div className="iconsBroker">
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoCallOutline />
                                <p>{broker.phone}</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoLogoWhatsapp />
                                <p>{broker.whatsapp}</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoMailOutline />
                                <p>{broker.email}</p>
                            </div>
                        </div>                        
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoGlobeOutline />
                                <p>{broker.website}</p>
                            </div>
                        </div>                        
                    </div>
                    </div>
                </div> 
                )
            })}


                </div>        
        </div>
    )
}