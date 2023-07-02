import "./selectAuto.css";

import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoCheckboxOutline, IoSearchOutline } from "react-icons/io5";

export function SelectAuto({AutoInfoLoaded}) {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

     const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
   
     const [search, setSearch] = useState("");
     const searchLower = search.toLowerCase();

    const {data} = useFetch(`/autos/company/${user.id}`);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function selectAuto(data) {
            AutoInfoLoaded(data)
            setIsOpenModaProcess(false);
        }

        const searchFilter = data?.filter((companies) => companies.title.toLowerCase().includes(searchLower) || companies.id.toLowerCase().includes(searchLower))

        Modal.setAppElement('#root');
    return (
        <>
         <button className="link" onClick={handleOpenModalProcess}>Selecinar imóvel</button>

        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Selecionar imóvel</h3>

            <div className="form">
                <input type="search" placeholder="Digite o título do imóvel" value={search} onChange={e => setSearch(e.target.value)} />
                
                <div className="listAuto">
                    {searchFilter?.map((Auto) => {
                        return (
                            <div className="dataAuto">
                                <div className="image">
                                    <img src={Auto.featuredImage} alt="" />
                                </div>

                                <div className="dataText">
                                <h5>{Auto.id} - {Auto.title}</h5>
                                <h6>{Auto.status} - {Auto.type} - {Auto.subType}</h6>
                                <h6>{Auto.district} - {Auto.city} - {Auto.uf}</h6>
                                </div>


                                <button onClick={() => selectAuto(Auto.id)}> <IoCheckboxOutline /> </button>
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