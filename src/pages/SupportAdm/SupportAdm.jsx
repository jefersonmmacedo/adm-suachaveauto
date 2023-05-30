import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import {IoCallOutline, IoLogoWhatsapp, IoChatbubbleEllipsesOutline, IoMailOutline} from "react-icons/io5"
import "./supportAdm.css"

export function SupportAdm() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    return (
        <div className="SupportAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <h3>Atendimento e suporte ao cliente</h3>
            <div className="informations">
                <div className="TextInfosSupport">
                    <h3>Entre em contato com nossa equipe:</h3>
                    <h4><IoLogoWhatsapp /> (21) 99742-9585</h4>
                    <h4><IoMailOutline /> contato@suachave.com.br</h4>
                    <h4>Atendimento: Seg - Sex. | 08:00 às 17h</h4>
                </div>
                <div className="buttonsSupport">
                <a href={`https://wa.me/5521997429585?text=Olá. Somos da ${user.fantasyName}, gostaria de um suporte.`} target="_blank" rel="noreferrer"><IoLogoWhatsapp /> Whatsapp</a>
                </div>               
                <div className="buttonsSupport">
                    <h2></h2>
                    <a href="https://jivo.chat/9OZTmy8b7M" target="_blank" rel="noreferrer"><IoChatbubbleEllipsesOutline /> Chat</a>
                </div>               
                <div className="buttonsSupport">
                    <a href="tel:21997429585"><IoCallOutline /> Ligar</a>
                </div>               
            </div>
            </div>
        </div>
    )
}