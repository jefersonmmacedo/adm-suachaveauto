import "./filterDataEquipe.css"
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import ReactTooltip from 'react-tooltip';

export function FilterDataEquipe({avatar, name, address, phone, whatsapp, email, interess}) {

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="FilterDataEquipe">
  <button className="btnControl" data-tip data-for='Ver Cliente' onClick={handleFiltro}><IoEyeOutline /></button>
  <ReactTooltip id='Ver Cliente' place="bottom" type="dark" effect="solid">
                         <span>Ver Cliente</span>
                        </ReactTooltip>

        <div className={filter === true ? "viewFilter" : "viewFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="dataClient">
            <div className="imageAvatar">
                <img src={avatar} alt={`Avatar de ${name}`} />
            </div>
            <h3>{name}</h3>
            <h5>{address}</h5>
            <h4>{phone}</h4>
            <h4>{whatsapp}</h4>
            <h4>{email}</h4>

            <h5>{interess}</h5>
        </div>
    </div>
        </div>
    )
}