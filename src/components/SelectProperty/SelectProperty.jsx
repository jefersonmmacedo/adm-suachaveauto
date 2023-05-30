import "./selectProperty.css";

import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IoCheckboxOutline, IoSearchOutline } from "react-icons/io5";

export function SelectProperty({propertyInfoLoaded}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

     const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
   
     const [search, setSearch] = useState("");
     const searchLower = search.toLowerCase();

    const {data} = useFetch(`/property/company/${user.id}`);

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function selectProperty(data) {
            propertyInfoLoaded(data)
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
                
                <div className="listProperty">
                    {searchFilter?.map((property) => {
                        return (
                            <div className="dataProperty">
                                <div className="image">
                                    <img src={property.featuredImage} alt="" />
                                </div>

                                <div className="dataText">
                                <h5>{property.id} - {property.title}</h5>
                                <h6>{property.status} - {property.type} - {property.subType}</h6>
                                <h6>{property.district} - {property.city} - {property.uf}</h6>
                                </div>


                                <button onClick={() => selectProperty(property.id)}> <IoCheckboxOutline /> </button>
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