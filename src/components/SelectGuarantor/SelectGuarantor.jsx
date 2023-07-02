import "./selectGuarantor.css";

import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoCheckboxOutline, IoSearchOutline } from "react-icons/io5";

export function SelectGuarantor({guarantorInfoLoaded}) {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

     const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
   
     const [search, setSearch] = useState("");
     const searchLower = search.toLowerCase();

    const {data} = useFetch(`/guarantorCompany/company/${user.id}`);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function selectGuarantor(data) {
            guarantorInfoLoaded(data)
            setIsOpenModaProcess(false);
        }

        const searchFilter = data?.filter((companies) => companies.name.toLowerCase().includes(searchLower) ||
                                                         companies.fantasyName.toLowerCase().includes(searchLower) ||
                                                        companies.id.toLowerCase().includes(searchLower))

        Modal.setAppElement('#root');
    return (
        <>
         <button className="link" onClick={handleOpenModalProcess}>Selecinar Fiador</button>

        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Selecionar fiador</h3>

            <div className="form">
                <input type="search" placeholder="Digite o título do imóvel" value={search} onChange={e => setSearch(e.target.value)} />
                
                <div className="listAuto">
                    {searchFilter?.map((auto) => {
                        return (
                            <div className="dataAuto" key={auto.id}>
                                <div className="dataText">
                                <h5>{auto.id} - {auto.name} | {auto.fantasyName}</h5>
                                <h6>{auto.cpf_Cnpj} - {auto.rg}</h6>
                                <h6>{auto.city} - {auto.uf}</h6>
                                </div>


                                <button onClick={() => selectGuarantor(auto.id)}> <IoCheckboxOutline /> </button>
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