import "./newStatusNote.css";

import { IoDocumentTextOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { useState } from "react";

export function NewStatusNote() {
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);

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
        <button className="New" onClick={handleOpenModalProcess} data-tip data-for='Novo Aluguel/Venda'><IoDocumentTextOutline /></button>
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
                <div className="DataInputs">
                    <div className="dataInputUnic">
                    <h5>Status do processo</h5>
                    <select >
                        <option value="">Status</option>
                    </select>
                    </div>
                    <div className="dataInputUnic2">
                    <h5>Digite a mensagem de status</h5>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <div className="ButtonsForm">
                <button className="send">Enviar Status</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}