import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myProposals.css";
import ImageHouse from "../../assets/images/house.jpg";
import ImageHouse1 from "../../assets/images/house1.jpg";
import ImageHouse2 from "../../assets/images/house2.jpg";
import {IoFileTrayFullOutline, IoTrashOutline, IoCreateOutline, IoLocationOutline, IoEyeOutline, IoHeartOutline, IoLogoWhatsapp, IoCallOutline, IoCalendarOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useEffect } from "react";
import { DateFormat } from "../../components/DateFormat/DateFormat";
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { ViewContract } from "../../components/ViewContract/ViewContract";
import { DeleteProposal } from "../../components/DeleteProposal/DeleteProposal";

export function MyProposals() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/negotiations/company/${user.id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    return (
        <div className="MyProposals">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <div className="textHome">
                <h3>Minhas propostas</h3>
                <a className="link" href={`/nova-proposta`}>Nova proposta</a>
                </div>
      

                <div className="search">
                    <input type="text" placeholder="Busque por: Id ou Cliente" />
                    <div className="selection">
                    <select>
                        <option value="">Status</option>
                        <option value="">Concluído</option>
                        <option value="">Pendente</option>
                        <option value="">Andamento</option>
                        <option value="">Cancelado</option>
                    </select>

                    <select>
                        <option value="">Tipo</option>
                        <option value="">Venda</option>
                        <option value="">Aluguel</option>
                    </select>
                    </div>
                </div>
            <div className="informations">

                {data.map((proposal) => {
                    return (
                        <div className="contracts" key={proposal.id}>
                            <div className="dataContracts">
                                <div className="dataContractsUnic">
                                    <h6>ID</h6>
                                    <h5>{proposal.id}</h5>
                                </div>
                                <div className="dataContractsUnic">
                                    <h6>ID Imóvel</h6>
                                    <h5>{proposal.idProperty}</h5>
                                </div>
                                <div className="dataContractsUnic">
                                    <h6>Cliente</h6>
                                    <h5>{proposal.nameClient}</h5>
                                </div>
                                <div className="dataContractsUnic">
                                    <h6>CPF</h6>
                                    <h5>{proposal.cpfClient}</h5>
                                </div>
                                <div className="dataContractsUnic">
                                    <h6>Data Início</h6>
                                    <h5>
                                        <DateFormat date={proposal.created_at} />
                                    </h5>
                                </div>
                                <div className="dataContractsUnic">
                                    <h6>Status</h6>
                                    <h5>{proposal.status}</h5>
                                </div>
                            </div>
  
                        <div className="buttons">
                           
                        <ViewContract />


                        <a href="/painel/editarimovel" className="btnControl" data-tip data-for='Editar contrato'><IoCreateOutline /></a>
                        <ReactTooltip id='Editar contrato' place="bottom" type="dark" effect="solid">
                         <span>Editar contrato</span>
                        </ReactTooltip>

    
                        <DeleteProposal id={proposal.id} idProperty={`${proposal.idProperty} `} nameClient={proposal.nameClient} cpfCnpjClient={proposal.cpfCnpjClient} />
                        
    

    
                        </div>
                    </div>  
                    )
                })}


            </div>
            </div>
        </div>
    )
}