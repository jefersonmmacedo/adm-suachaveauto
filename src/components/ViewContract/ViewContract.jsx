import "./viewContract.css"
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import ReactTooltip from 'react-tooltip';

export function ViewContract({id}) {

    const [filter, setFilter] = useState(false);

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="ViewContract">
            <button className="btnControl" data-tip data-for='Ver contrato' onClick={handleFiltro}><IoEyeOutline /></button>
            <ReactTooltip id='Ver contrato' place="bottom" type="dark" effect="solid">
            <span>Ver contrato</span>
            </ReactTooltip>

        <div className={filter === true ? "viewFilter" : "viewFilterNone"}>
        <div className="buttonsFilter">
        <button className="btnFilter" onClick={handleFiltro}>X</button>
        </div>
        <div className="dataClient">
           <h3>Dados de contrato</h3>
        </div>
    </div>
        </div>
    )
}