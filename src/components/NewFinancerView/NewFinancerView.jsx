import "./newFinancerView.css";

import { IoCloseOutline, IoCreateOutline, IoEyeOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";




export function NewFinancerView({id}) {
    const [isOpenModalSearch, setIsOpenModaSearch] = useState(false);

    const {data} = useFetch((`/financer/unic/${id}`))

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    function handleOpenModalSearch(e) {
        e.preventDefault();
          setIsOpenModaSearch(true)
        }
      
        function handleCloseModalSearch(e) {
          e.preventDefault();
          setIsOpenModaSearch(false);
        }
  
      
      Modal.setAppElement('#root');
    return (
        <>
         <button onClick={handleOpenModalSearch}><IoEyeOutline /> </button>


         <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <IoCloseOutline color={"#fff"}/> 
            </button>
            <div className="content-modal-home-Search">
            <div className="itensModalHome-Search">
                <div className="form">
                <h3>{data[0].title}</h3>
                <h5 className={data[0].type ===  "Receita" ? "typeReceita" : "typeDespesa"}>{data[0].type}</h5>
                <h4>{data[0].description}</h4>
                <h4><b>Valor:</b> R$ {data[0].value}</h4>
                <h4> <b>Data:</b> {new Date(data[0].created_at).getDate()}/{new Date(data[0].created_at).getMonth() +1}/{new Date(data[0].created_at).getFullYear()} às {new Date(data[0].created_at).getHours()}:{new Date(data[0].created_at).getMinutes()}h </h4>
                </div>
            </div>
            </div>
            </Modal>
        </>
    )
}