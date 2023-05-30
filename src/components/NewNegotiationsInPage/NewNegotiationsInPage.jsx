import "./newNegotiationsInPage.css";

import { IoCheckboxOutline, IoHomeOutline, IoLocationOutline, IoLogoWhatsapp, IoMailOpenOutline, IoPhonePortraitOutline, IoSearchOutline} from 'react-icons/io5';
import {VscNewFile} from 'react-icons/vsc';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";

export function NewNegotiationsInPage() {
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [emailSearch, setEmailSearch] = useState();
    const [client, setClient] = useState([]);

    async function newClient(e) {
        e.preventDefault();
        await api.get(`/client/unic/${emailSearch}`).then((res) => {
            console.log(res.data[0])
            setClient(res.data[0])
        }).catch((err) => {
            console.log(err)
        })
    }
    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }
        

        Modal.setAppElement('#root');
    return (
        <>
        <button className="New" onClick={handleOpenModalProcess} data-tip data-for='Novo Aluguel/Venda'><VscNewFile /></button>
            <ReactTooltip id='Novo Aluguel/Venda' place="bottom" type="dark" effect="solid">
            <span>Novo Aluguel/Venda</span>
            </ReactTooltip>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
        {/* <button type="button" className="react-modal-button" onClick={handleCloseModalProcess}>
        <IoCloseOutline color={"#fff"}/> 
        </button> */}



        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Nova venda/aluguel</h3>

            <div className="form">
                <div className="ProcessData">
                <div className="dataProperty">
                        <div className="image">
                       <img src={data[0].featuredImage} alt={data[0].featuredImage} />
                        </div>

                        <div className="userInformations">
                            <h4>{data[0].title}</h4>
                            <h5><IoHomeOutline /> {data[0].type} - {data[0].subType}</h5>
                            <h5><IoLocationOutline />{data[0].road} - {data[0].district} - {data[0].city} - {data[0].uf}</h5>
                            <h5><IoCheckboxOutline /> {data[0].status}</h5>
                        </div>
                    </div>

                    <div className="dataUser">
                        <div className="searchData">
                        <input type="text" placeholder="Digite o e-mail do cliente" value={emailSearch} onChange={e => setEmailSearch(e.target.value)}/>
                        <button className="btn" onClick={newClient}><IoSearchOutline /></button>
                        </div>
                        {client?.length === 0 ? "" :
                        <div className="userInformations">
                            <h4>{client?.name}</h4>
                            <h5><IoLocationOutline /> {client?.city} - {client?.uf}</h5>
                            <h5><IoMailOpenOutline />{client?.email}</h5>
                            <h5><IoPhonePortraitOutline />{client?.phone}</h5>
                            <h5><IoLogoWhatsapp />{client?.whatsapp}</h5>
                        </div>
                        }
                    </div>

                </div>

                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Tipo de processo</h5>
                    <input type="text"  value={data[0].status} onChange={e => setClient()}/>
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Prazo contrato (Número)</h5>
                    <div className="doubleInputs">
                    <input type="text" placeholder="01" />
                        <select>
                            <option value="Semanas">Semanas</option>
                            <option value="Meses">Meses</option>
                            <option value="Anos">Anos</option>
                        </select>
                    </div>
                    </div>
                    <div className="dataInputUnic">
                    <h5>Número de parcelas</h5>
                        <input type="text" placeholder="Digite o número de parcelas" />
                    </div>
                </div>
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Valor do imóvel - R$</h5>
                    <input type="text" placeholder="Digite o prazo em números" />
                       
                    </div>
                    <div className="dataInputUnic">
                    <h5>Valor total dos encargos</h5>
                    <input type="text" placeholder="Digite o prazo em números" />
                    </div>
                    <div className="dataInputUnic">
                    <h5>Valor total do contrato</h5>
                        <input type="text" placeholder="Digite o número de parcelas" />
                    </div>
                </div>

                <div className="ButtonsForm">
                <button className="send">Enviar Solicitação</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}