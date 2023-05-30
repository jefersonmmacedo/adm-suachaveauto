import "./newFavorite.css"
import { IoCloseOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import Modal from 'react-modal';
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";

export function NewFavorite({idProperty, idCompany, page}) {

  const Local = localStorage.getItem("suachave");
  const user = JSON.parse(Local);

  const [isOpenModal, setIsOpenModa] = useState(false);
  const idClient = user === null ? "000000" : user.id;

  const {data} = useFetch(`/favorite/filter/${idProperty}/${idClient}`);

    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }

        async function newFavorite(e) {
          e.preventDefault();
          const data = {
            idClient,
            idProperty,
            idCompany
          }
          await api.post(`/favorite`, data).then((res) => {
            console.log("Novo favorito adicionado com sucesso")
          }).catch((error) => {
            console.log(error)
          })
        }

        async function deleteFavorite(id) {
          console.log(id)
          await api.delete(`/favorite/${id}`).then((res) => {
            console.log("Favorito Deletado")
          }).catch((error) => {
            console.log(error)
          })
        }
  

    Modal.setAppElement('#root');

    return (
        <>
        <div className="NewFavorite" >
          {data?.length === 0 ? 
          <IoHeartOutline color={page ===  "yes" ? "#999999": "#E6E7E8"} onClick={user === null ? handleOpenModal : newFavorite}/>
          :
          <IoHeart color={"#E0282F"} onClick={user === null ? handleOpenModal : () => deleteFavorite(data[0].id)}/>
          }
          
          </div>

        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Favorite">
            <div className="itensModalFavorite">
                    <IoHeart />

                    <h1>Opa! <br />
                    Temos um favorito.</h1>

                    <h4>Entre em sua conta ou cadastre-se para acessar seus favoritos e acompanhar os anuncios que mais gostar.</h4>

                    <a href="/entrar">Fazer login</a>

            </div>
            </div>
            </Modal>
        </>
    )
}
