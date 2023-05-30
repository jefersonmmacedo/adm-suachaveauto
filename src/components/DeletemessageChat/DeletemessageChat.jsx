import "./deletemessageChat.css";
import { IoCloseOutline, IoEllipsisVerticalOutline} from 'react-icons/io5';
import Modal from 'react-modal';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useState } from "react";


export function DeletemessageChat({id}) {
    const {deleteActualMessage} = useContext(AuthContext);
    const [isOpenModalSearch, setIsOpenModaSearch] = useState(false);

    function handleOpenModalSearch(e) {
        e.preventDefault();
          setIsOpenModaSearch(true)
        }
      
        function handleCloseModalSearch() {
          setIsOpenModaSearch(false);
        }

        function handleDeleteActualMessage(e) {
            e.preventDefault();
            deleteActualMessage(id)
            handleCloseModalSearch()
        }

      Modal.setAppElement('#root');
    return (
        <>
         <button className="deletemessageChat" onClick={handleOpenModalSearch}><IoEllipsisVerticalOutline /> </button>

         <Modal isOpen={isOpenModalSearch} onRequestClose={handleCloseModalSearch}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalSearch}>
            <IoCloseOutline color={"#fff"}/> 
            </button>
            <div className="content-modal-home-Search">
            <div className="itensModalHome-Search">
               <div className="form">
                <h2>Deletar mensagen?</h2>
                <div className="ButtonsDeleteMessage">
                    <button className="btn1" onClick={handleDeleteActualMessage}>Deletar Mensagem</button>
                    <button className="btn2" onClick={handleCloseModalSearch}>Cancelar</button>
                </div>
               </div>
            </div>
            </div>
            </Modal>
        </>
    )
}