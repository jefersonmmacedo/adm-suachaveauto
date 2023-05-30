import "./editStatusProperty.css";

import { IoArrowDownCircleOutline, IoFileTrayFullOutline, IoArrowUpCircleOutline, IoCloseOutline, IoSyncOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { mask as masker, unMask } from "remask";
import { toNumber } from "vanilla-masker";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { MyButtonDocument } from "../UploadDocuments/UploadDocuments";
import { useState } from "react";
import ReactTooltip from 'react-tooltip';


export function EditStatusProperty({id}) {

    const {updateStatusProperty} = useContext(AuthContext);

    const [isOpenModalSearch, setIsOpenModaSearch] = useState(false);
    const [availability, setAvailability] = useState("");



    function handleOpenModalSearch(e) {
        e.preventDefault();
          setIsOpenModaSearch(true)
        }
      
        function handleCloseModalSearch(e) {
          e.preventDefault();
          setIsOpenModaSearch(false);
        }
  
        function handleNewType(data) {
            setAvailability(data)
        }

        function handleUptadeAvailability() {
            updateStatusProperty({id, availability});
            setIsOpenModaSearch(false);
        }
    


      Modal.setAppElement('#root');
    return (
        <div className="EditStatus">
         <button className="notView" data-tip data-for='Vendido/Alugado' onClick={handleOpenModalSearch}>Alterar disponibilidade</button>
                        <ReactTooltip id='Vendido/Alugado' place="bottom" type="dark" effect="solid">
                         <span>Vendido/Alugado</span>
                        </ReactTooltip>


         <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <IoCloseOutline color={"#fff"}/> 
            </button>
            <div className="content-modal-home-Search">
            <div className="itensModalHome-Search">
            <div className="form">
                    {/* <input type="text" placeholder="Título" /> */}
                    <div className="TypeButtons">
                        <button className={availability === "Disponível" ? "btnType3Select" : "btnType1Select"} onClick={() => handleNewType("Disponível")}><IoArrowUpCircleOutline />Disponível</button>
                        <button className={availability === "Vendido" ? "btnType7Select" : "btnType8Select"} onClick={() => handleNewType("Vendido")}><IoArrowUpCircleOutline />Vendido</button>
                        <button className={availability === "Alugado" ? "btnType4Select" : "btnType2Select"} onClick={() => handleNewType("Alugado")}><IoSyncOutline />Alugado</button>
                        <button className={availability === "Indisponível" ? "btnType6Select" : "btnType5Select"} onClick={() => handleNewType("Indisponível")}><IoCloseOutline />Indisponível</button>
                        <button className={availability === "Reservado" ? "btnType10Select" : "btnType9Select"} onClick={() => handleNewType("Reservado")}><IoCloseOutline />Reservado</button>
                    </div>
                    <br />
                    <button className="send" onClick={handleUptadeAvailability}>Alterar status</button>
                    </div>
            </div>
            </div>
            </Modal>
        </div>
    )
}