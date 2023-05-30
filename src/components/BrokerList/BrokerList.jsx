import "./brokerList.css";
import {FaBed, FaShower, FaCar} from 'react-icons/fa';
import {IoCallOutline, IoLogoWhatsapp, IoMailOutline, IoGlobeOutline, IoLocationOutline} from 'react-icons/io5'
import imobiliária from "../../assets/images/corretor1.jpg";
import imobiliária2 from "../../assets/images/corretor2.jpg";
import imobiliária3 from "../../assets/images/corretor3.jpg";

export function BrokerList() {
    return (
        <div className="BrokerList">

            <div className="listBroker">
            
            <div className="BrokerUnicFavorite">
                    <div className="image">
                    <img src={imobiliária} alt="" />
                    </div>
                    <div className="text">
                    <h3>James Summer</h3>
                    <h5><IoLocationOutline />Centro - Rio Bonito - Rio de Janeiro</h5>
                    <div className="iconsBroker">
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoCallOutline />
                                <p>(21) 2222-2222</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoLogoWhatsapp />
                                <p>(21) 99999-9999)</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoMailOutline />
                                <p>contato@suachave.com.br</p>
                            </div>
                        </div>                        
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoGlobeOutline />
                                <p>www.suachave.com.br</p>
                            </div>
                        </div>                        
                    </div>
                    </div>
                </div> 
                <div className="BrokerUnicFavorite">
                    <div className="image">
                    <img src={imobiliária3} alt="" />
                    </div>
                    <div className="text">
                    <h3>James Summer</h3>
                    <h5><IoLocationOutline />Centro - Rio Bonito - Rio de Janeiro</h5>
                    <div className="iconsBroker">
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoCallOutline />
                                <p>(21) 2222-2222</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoLogoWhatsapp />
                                <p>(21) 99999-9999)</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoMailOutline />
                                <p>contato@suachave.com.br</p>
                            </div>
                        </div>                        
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoGlobeOutline />
                                <p>www.suachave.com.br</p>
                            </div>
                        </div>                        
                    </div>
                    </div>
                </div> 
                <div className="BrokerUnicFavorite">
                    <div className="image">
                    <img src={imobiliária2} alt="" />
                    </div>
                    <div className="text">
                    <h3>James Summer</h3>
                    <h5><IoLocationOutline />Centro - Rio Bonito - Rio de Janeiro</h5>
                    <div className="iconsBroker">
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoCallOutline />
                                <p>(21) 2222-2222</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoLogoWhatsapp />
                                <p>(21) 99999-9999)</p>
                            </div>
                        </div>
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoMailOutline />
                                <p>contato@suachave.com.br</p>
                            </div>
                        </div>                        
                        <div className="iconBrokerUnic">
                            <div className="simbolBroker">
                                <IoGlobeOutline />
                                <p>www.suachave.com.br</p>
                            </div>
                        </div>                        
                    </div>
                    </div>
                </div> 

                </div>        
        </div>
    )
}