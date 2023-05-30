import "./deleteClient.css";

import {  IoClose, IoCloseCircle, IoCloseOutline, IoTrashOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import ReactTooltip from 'react-tooltip';

export function DeleteClient({id, name, fantasyName, cpfCnpj, address, typeClient}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {deleteClientCompany } = useContext(AuthContext)

    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        async function handleDeleteClient() {
          deleteClientCompany({id})
        }

        Modal.setAppElement('#root');
    return (
        <>
       <button className="btnControl" onClick={handleOpenModalProcess} data-tip data-for='Editar'><IoTrashOutline /></button>
       <ReactTooltip id='Deletar' place="bottom" type="dark" effect="solid">
                         <span>Deletar</span>
                        </ReactTooltip>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
          <div className="textModalClient">
                  <IoCloseCircle />
                  <h3>Deseja deletar o {typeClient}:</h3>
                  <h4>{name}</h4>
                  <h4>({fantasyName})</h4>
                  <h5>CPF/CNPJ: {cpfCnpj} | Endereço: {address}</h5>
          </div>
            <div className="buttons">
                    <button onClick={handleDeleteClient}><IoTrashOutline/> Deletar</button>
                    <button className="cancel" onClick={handleCloseModalProcess}><IoCloseOutline/> Cancelar</button>
            </div>
        </div>
        </div>

        </Modal>
        </>
    )
}