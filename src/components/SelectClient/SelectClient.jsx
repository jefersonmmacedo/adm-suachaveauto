﻿import "./selectClient.css";

import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoCheckboxOutline, IoSearchOutline } from "react-icons/io5";

export function SelectClient({clientInfoLoaded}) {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

     const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
   
     const [search, setSearch] = useState("");
     const searchLower = search.toLowerCase();

    const {data} = useFetch(`/clientCompany/company/${user.id}`);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function selectClient(data) {
            clientInfoLoaded(data)
            setIsOpenModaProcess(false);
        }

        const searchFilter = data?.filter((companies) => companies.name.toLowerCase().includes(searchLower) ||
                                                         companies.fantasyName.toLowerCase().includes(searchLower) ||
                                                        companies.id.toLowerCase().includes(searchLower))

        Modal.setAppElement('#root');
    return (
        <>
         <button className="link" onClick={handleOpenModalProcess}>Selecinar cliente</button>

        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Selecionar cliente</h3>

            <div className="form">
                <input type="search" placeholder="Digite o título do imóvel" value={search} onChange={e => setSearch(e.target.value)} />
                
                <div className="listAuto">
                    {searchFilter?.map((auto) => {
                        return (
                            <div className="dataAuto">
                                <div className="dataText">
                                <h5>{auto.id} - {auto.name} | {auto.fantasyName}</h5>
                                <h6>{auto.cpf_Cnpj} - {auto.rg}</h6>
                                <h6>{auto.city} - {auto.uf}</h6>
                                </div>


                                <button onClick={() => selectClient(auto.id)}> <IoCheckboxOutline /> </button>
                            </div>
                        )
                    })}
                </div>


                <div className="ButtonsForm">
                {/* <button className="send" onClick="">inclur no contrato</button> */}
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>

        </Modal>
        </>
    )
}