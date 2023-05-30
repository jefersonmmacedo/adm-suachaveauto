import "./filterDataClient.css"
import { useState } from "react";
import { IoCallOutline, IoEyeOutline, IoMailOutline, IoMapOutline } from "react-icons/io5";
import ReactTooltip from 'react-tooltip';

export function FilterDataClient({fantasyName, name, address, phone, whatsapp, email, interess}) {

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="FilterDataClient">
  <button className="btnControl" data-tip data-for='Ver Cliente' onClick={handleFiltro}><IoEyeOutline /></button>
  <ReactTooltip id='Ver Cliente' place="bottom" type="dark" effect="solid">
                         <span>Ver Cliente</span>
                        </ReactTooltip>

        <div className={filter === true ? "viewFilter" : "viewFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="dataClient">
            <h3>{name}</h3>
            <h4>{fantasyName}</h4>
            <h5><IoMapOutline /> <span>Endereço:</span></h5>
            <h5>{address}</h5>
            <h5><IoCallOutline /> <span>Telefone/Whatsapp:</span></h5>
            <h5>{phone} - {whatsapp}</h5>
            <h5><IoMailOutline /> <span>E-mail:</span></h5>
            <h5>{email}</h5>
        </div>
    </div>
        </div>
    )
}