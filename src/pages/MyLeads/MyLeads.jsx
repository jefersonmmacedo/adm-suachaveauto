import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myLeads.css";
import {IoFileTrayFullOutline, IoTrashOutline, IoCreateOutline, IoLocationOutline, IoEyeOutline, IoHeartOutline, IoLogoWhatsapp, IoCallOutline, IoMailOutline, IoHomeOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { NewClient } from "../../components/NewClient/NewClient";

export function MyLeads() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const profile = "https://www.forestcom.com.br/wp-content/uploads/2018/09/blank-profile-picture-973460_640.png";

    const {data} = useFetch(`/contact/company/${user.id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    return (
        <div className="MyLeads">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
                <h3>Meus Leads</h3>
                {/* <NewClient /> */}
                </div>

               

            <div className="informationsClients">

                {data.map((client) => {
                    return (
                        <div className="clientListAdm" key={client.id}>
                        {/* <div className="image">
                            <a href="/conversa">
                            <img 
                        src={client.avatar}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // previne loop
                            currentTarget.src="https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240";
                        }}
                        />
                            </a>
                        </div> */}
                        <div className="textclientListAdm">
                            <div className="textDataclientListAdm">
                                <div className="dataUnic">
                                    <h5> <b>{client.name}</b> </h5>
                                    <h5><DateFormat2 date={client.created_at}/></h5>
                                </div>
                                


                                <div className="dataUnic">
                                    <h5> <b>Tipo de contato:</b> </h5>
                                    <h6>{client.type}</h6>
                                </div>
                                <div className="dataUnic">
                                    <h5> <b>Origem:</b> </h5>
                                    <h6>{client.origin === "" || client.origin === null || client.origin === undefined ? "Portal" : client.origin}</h6>
                                </div>

                                <div className="dataUnic">
                                    <h5> <b>Imóvel:</b> </h5>
                                    <a href={`https://www.suachave.com.br/imovel/${client.idProperty}`} target="_blank" rel="noreferrer">
                                      <h5><IoHomeOutline /> {client.idProperty} </h5>
                                    </a>
                                </div>

                                <div className="dataUnic">
                                    <div className="contactText">
                                        <h5>{client.type === "Whatsapp" ? 
                                        <><IoLogoWhatsapp/> {client.whatsapp}</>
                                        :
                                        <><IoCallOutline /> {client.phone}</>
                                        }</h5>
                                    </div>
                                    <div className="contactText">
                                        <h5><IoMailOutline /> {client.email}</h5>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
    
   
                        <div className="buttonsClients">
                            <NewClient pageProp="lead" nameLead={client.name} emailLead={client.email} phoneLead={client.phone} whatsappLead={client.whatsapp} idProperty={client.idProperty} />
                        </div> 
                    </div>  
                    )
                })}


            </div>
            </div>
        </div>
    )
}