import "./processProperty.css"
import {IoSearchOutline, IoCalendarOutline} from "react-icons/io5";
import {BsPatchCheck} from "react-icons/bs";
 export function ProcessProperty() {
    return (
        <div className="ProcessProperty">
            <div className="processUnicText">
                <h3>Veja como encontrar seu imóvel</h3>
                <h6>Veja os 3 passos</h6>
            </div>
            <div className="processUnic">
                <IoSearchOutline />
                <h5>Faça a busca pelo imóvel desejado</h5>
            </div>
            <div className="processUnic">
                <IoCalendarOutline />
            <h5>Agende uma visita para avaliação</h5>
            </div>
            <div className="processUnic">
                <BsPatchCheck />
            <h5>Solicite a compre ou aluguél do imóvel</h5>
            </div>
        </div>
    )
}