import "./blockHome.css";
import Casa from "../../assets/images/casa.jpg"
import Predio from "../../assets/images/predio.jpg"
import {IoChevronForwardOutline} from "react-icons/io5"

export function BlockHome() {
    return (
        <div className="BlockHome">
            <div className="BlockHomeUnic">
                <div className="textBlockHome">
                    <h3>Residencial</h3>
                    <h5>Casas, apartamentos, kitnets... </h5>

                    <button>Ver todos <IoChevronForwardOutline /></button>
                </div>
                <div className="imageBlockHome">
                    <img src={Casa} alt="Imagem de uma casa com carro na garagem" />
                </div>
            </div>

            <div className="BlockHomeUnic">
                <div className="textBlockHome">
                    <h3>Comercial</h3>
                    <h5>Sala comerciis, lojas, studio... </h5>

                    <button>Ver todos <IoChevronForwardOutline /></button>
                </div>
                <div className="imageBlockHome">
                    <img src={Predio} alt="Imagem de prédios vistos de baixo" />
                </div>
            </div>
        </div>
    )
}