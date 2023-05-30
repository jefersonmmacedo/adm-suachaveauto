import "./propertyUnicBlockLoader.css";
import { IoBedOutline, IoCarSportOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";

import { NewFavorite } from "../NewFavorite/NewFavorite";

export function PropertyUnicBlockLoader() {
    return (
        <div className="PropertyUnicBlockLoader">
                    <div className="image">
                    </div>

                  
                    <div className="text">
                  
                    <h4>Imovel</h4>
                      
                    <h6><IoLocationOutline /></h6>
                    <div className="icons">
                        <div className="iconUnic">
                                <IoBedOutline />
                            <div className="simbol">
                                <p> Quartos</p>
                            </div>
                        </div>
                        <div className="iconUnic">
                                <MdOutlineShower />
                            <div className="simbol">
                                <p> Banheiros</p>
                            </div>
                        </div>
                        <div className="iconUnic">
                                <IoCarSportOutline />
                            <div className="simbol">
                                <p> Vagas</p>
                            </div>
                        </div>
                    </div>
                    <div className="pricing">
                        <h6><span> </span></h6>
                        <h3><span>2.000.000,00</span></h3>
                    </div>
                    </div>
                </div>
    )
}