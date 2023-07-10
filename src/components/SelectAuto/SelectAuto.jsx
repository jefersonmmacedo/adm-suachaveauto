import "./selectAuto.css";

import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoCheckboxOutline, IoSearchOutline } from "react-icons/io5";

export function SelectAuto({AutoInfoLoaded}) {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

     const [isOpenModalAuto, setIsOpenModaAuto] = useState(false);
   
     const [search, setSearch] = useState("");
     const searchLower = search.toLowerCase();

    const {data} = useFetch(`/autos/company/${user.id}`);

    function handleOpenModalAuto(e) {
        e.preventDefault();
          setIsOpenModaAuto(true)
        }
      
        function handleCloseModalAuto(e) {
          e.preventDefault();
          setIsOpenModaAuto(false);
        }

        function selectAutoUnic(data) {
            AutoInfoLoaded(data)
            setIsOpenModaAuto(false);
        }

        const searchFilter = data?.filter((companies) => companies.brand?.toLowerCase().includes(searchLower)
                                        || companies.version?.toLowerCase().includes(searchLower)
                                        || companies.plate?.toLowerCase().includes(searchLower)
                                        || companies.model?.toLowerCase().includes(searchLower))

        Modal.setAppElement('#root');
    return (
        <>
         <button className="link" onClick={handleOpenModalAuto}>Selecionar Auto</button>

        <Modal isOpen={isOpenModalAuto} onRequestClose={handleCloseModalAuto}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">

        <div className="content-moda-Auto">
        <div className="itensModal-Auto">
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
                                <h5>{Auto.brand} - {Auto.model} - Placa:{Auto.plate}</h5>
                                <h6>{Auto.version} - {Auto.year}/{Auto.yearModel}</h6>
                                <h6>{Auto.city} - {Auto.uf}</h6>
                                </div>


                                <button onClick={() => selectAutoUnic(Auto.id)}> <IoCheckboxOutline /> </button>
                            </div>
                        )
                    })}
                </div>


                <div className="ButtonsForm">
                {/* <button className="send" onClick="">inclur no contrato</button> */}
                <button className="cancel" onClick={handleCloseModalAuto}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>

        </Modal>
        </>
    )
}