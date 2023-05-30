import "./deleteRegisterSale.css";

import {  IoClose, IoCloseCircle, IoCloseOutline, IoTrashOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import ReactTooltip from 'react-tooltip';
import api from "../../services/api";
import { useEffect } from "react";

export function DeleteRegisterSale({id, idProperty, nameClient, cpfCnpjClient}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const { deleteRegisterSaleCompany } = useContext(AuthContext)

    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [title, setTitle] = useState(false);
    const [type, setType] = useState(false);
    const [subType, setSubType] = useState(false);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        async function handleDeleteRegisterSale() {
          console.log({id})
         deleteRegisterSaleCompany({id})
        }

        useEffect(() => {
          async function propertyInfoLoaded() {

            await api.get(`/property/${idProperty}`).then((res) => {
                setTitle(res.data[0]?.title)
                setType(res.data[0]?.type)
                setSubType(res.data[0]?.subType)
            }).catch((error) => {
                console.log(error)
            })
        }

        propertyInfoLoaded()
          
        },[])

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
          <div className="textModalRegisterSale">
                  <IoCloseCircle />
                  <h3>Deseja deletar o registro de venda</h3>
                  <h4>Contrato: {id}</h4>
                  <h4>Imóvel: {title}</h4>
                  <h5>{type} - {subType}</h5>
                  <br />
                  <h4>Cliente: {nameClient} | CPF/CNPJ: {cpfCnpjClient}</h4>
          </div>
            <div className="buttons">
                    <button onClick={handleDeleteRegisterSale}><IoTrashOutline/> Deletar</button>
                    <button className="cancel" onClick={handleCloseModalProcess}><IoCloseOutline/> Cancelar</button>
            </div>
        </div>
        </div>

        </Modal>
        </>
    )
}