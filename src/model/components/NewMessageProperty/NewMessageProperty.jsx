import "./newMessageProperty.css"
import { IoChatboxEllipses, IoCloseOutline, IoHeart } from "react-icons/io5";
import { useState } from "react";
import Modal from 'react-modal';

export function NewMessageProperty() {
    const [isOpenModal, setIsOpenModa] = useState(false);
    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }
  

    Modal.setAppElement('#root');

    return (
        <>
        <button className="buttonMessage" onClick={handleOpenModal}><IoChatboxEllipses/> Mensagem</button>

        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Favorite">
            <div className="itensModalFavorite">
                    <IoChatboxEllipses />

                    <h1>Oba! <br />
                    Vamos conversar.</h1>

                    <h4>Entre em sua conta ou cadastre-se para para poder mandar mensagens e ter mais detalhes sobre os anúncios.</h4>

                    <a href="/entrar">Fazer login</a>

            </div>
            </div>
            </Modal>
        </>
    )
}
