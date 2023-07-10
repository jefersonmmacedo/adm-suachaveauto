import "./toolBar.css";
import LogoImg from '../../assets/images/imob2.png'
import {IoSpeedometerOutline, IoPersonOutline,  IoChatboxEllipsesOutline, IoHomeOutline, IoCalendarOutline,
    IoQrCodeOutline, IoPeopleOutline, IoTimerOutline, IoSearchOutline, IoFunnelOutline, IoDocumentTextOutline, IoDocumentsOutline, IoExtensionPuzzleOutline, IoLaptopOutline, IoSettingsOutline, IoCarSportOutline } from 'react-icons/io5';

import {TbCurrencyDollar} from 'react-icons/tb';

import {RiExchangeDollarLine } from 'react-icons/ri';
import {MdOutlineChecklistRtl } from 'react-icons/md';
import {BsBuilding } from 'react-icons/bs';
import {TbHeadset } from 'react-icons/tb';
import {AiOutlineUsergroupAdd } from 'react-icons/ai';
import {ImConnection } from 'react-icons/im';
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
export function ToolBar() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);
    
  const [plain, setPlain] = useState();
  const [myPayment, setMyPayment] = useState();

    useEffect(() => {
        async function loadMyPlain() {
          await api.get(`/myplain/${user.id}`).then((res) => {
            loadPlains(res.data[0]?.idPlain)
            setMyPayment(res.data[0])
          })
        }
    
        async function loadPlains(id) {
          await api.get(`/plains/plain/${id}`).then((res) => {
            setPlain(res.data[0])
          })
        }
        loadMyPlain()
      }, []);
     
    return (
        <div className="ToolBar">
            {/* <div className="image">
                <img src={user.logo} alt="" />
            </div> */}
            <div className="Tools">
                <div className="ToolUnic">
                   <a href="/home">
                    <IoSpeedometerOutline /><p>Painel</p>                    
                    </a>
                </div>
                <div className="ToolUnic3">
                   <a href="/autos">
                    <IoCarSportOutline /><p>Autos</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href="/leads">
                   <IoFunnelOutline /><p>Leads</p>
                    </a>
                </div>
                <div className="ToolUnic">
                   <a href="/mensagens">
                    <IoChatboxEllipsesOutline /><p>Chat</p>
                    </a>
                </div>
                <div className="ToolUnic">
                   <a href="/agendamentos">
                    <IoCalendarOutline /><p>Agenda</p>
                    </a>
                </div>
                {/* <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Start"
                            : "/avaliacoes"}>
                    <IoSearchOutline /><p>Avaliações</p>
                    </a>
                </div> */}
                <div className="ToolUnic2">
                   <a href="/match">
                   <ImConnection /><p>Match</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href="/clientes">
                   <AiOutlineUsergroupAdd /><p>Cadastros</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Start"
                            : "/propostas" }>
                    <HiOutlineClipboardDocumentCheck /><p>Propostas</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Start"
                            : "/vendas" }>
                    <RiExchangeDollarLine /><p>Vendas</p>
                    </a>
                </div>
                {/* <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Start"
                            : "/contratos"}>
                    <IoDocumentTextOutline /><p>Contratos</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href="/vistorias">
                    <MdOutlineChecklistRtl /><p>Vistorias</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start"?
                            "/atualizar-plano/Start"
                            : "/encargos"}>
                    <RiExchangeDollarLine /><p>Encargos</p>
                    </a>
                </div> */}
                <div className="ToolUnic2">
                   <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Start"
                            : "/financeiro"}>
                    <TbCurrencyDollar /><p>Financeiro</p>
                    </a>
                </div>
                <div className="ToolUnic">
                   <a href="/minhaconta">
                    <IoPersonOutline /><p>Conta</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                <a href={myPayment?.namePlain === "Free" || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Lite"
                            : "/meu-site" }>
                    <IoLaptopOutline /><p>Meu site</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href="/suporte">
                    <TbHeadset /><p>Call Center</p>
                    </a>
                </div>
                <div className="ToolUnic2">
                   <a href="/">
                    </a>
                </div>
            </div>
        </div>
    )
}