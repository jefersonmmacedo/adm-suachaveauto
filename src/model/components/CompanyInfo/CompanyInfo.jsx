import "./companyInfo.css";
import {IoCall,IoMail, IoLocationOutline, IoLogoWhatsapp, IoMailOutline, IoChatboxEllipsesOutline, IoCloseOutline} from 'react-icons/io5'
import {FaIdCard} from 'react-icons/fa'
import {HiOutlineIdentification} from 'react-icons/hi'
import imobiliária from "../../assets/images/imob1.png";
import { useState } from "react";
import Modal from 'react-modal';
import { useFetch } from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function CompanyInfo({idProperty, idCompany}) {
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const {newContact} = useContext(AuthContext);

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalPhone, setIsOpenModaPhone] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const {data} = useFetch(`/company/unic/${idCompany}`)

    if(!data) {
        return (
            <h6>Carregando...</h6>
        )
    }

    function handleNewContactButton(type) {
        newContact({
        idProperty: idProperty, idCompany: idCompany, idClient: user.id, name: user.name,
        email: user.email, phone: user.phone, whatsapp: user.whatsapp, type: type, link: `http://www.suachave.com.br/imovel/${idProperty}`})
    }

    function handleNewContactModal(type) {
        newContact({
        idProperty: idProperty, idCompany: idCompany, idClient: "User Sem cadastro", name: name,
        email: email, phone: phone, whatsapp: phone, type: type, link: `http://www.suachave.com.br/imovel/${idProperty}`})

        if(type === "WhatsApp") {
            setIsOpenModa(false)
        } else {
            setIsOpenModaPhone(false)
        }
    }


    function handleOpenModal(e) {
        e.preventDefault();
          setIsOpenModa(true)
        }
      
        function handleCloseModal(e) {
          e.preventDefault();
          setIsOpenModa(false);
        }
  
    function handleOpenModalPhone(e) {
        e.preventDefault();
          setIsOpenModaPhone(true)
        }
      
        function handleCloseModalPhone(e) {
          e.preventDefault();
          setIsOpenModaPhone(false);
        }
  

    Modal.setAppElement('#root');

    return (
        <div className="CompanyInfo">
            <div className="Head">
            <div className="image">
                <img src={imobiliária} alt="" />
            </div>
            <div className="textHead">
            <h4 >{data[0].fantasyName}</h4>
            <h5><IoLocationOutline />{data[0].road}, {data[0].number} - {data[0].district} - {data[0].city} - {data[0].uf}</h5>
            <h5><HiOutlineIdentification />CRECI: <span> {data[0].creci}</span></h5>
            </div>
            </div>

            <div className="contact">
            </div>
                <divo className="buttonsContact">
                    <button className="btn-whats" onClick={user == null ? handleOpenModal : () => handleNewContactButton("Whatsapp")}><IoLogoWhatsapp /> Whatsapp</button>
                    <button onClick={user == null ? handleOpenModalPhone : () => handleNewContactButton("Ligação") }><IoCall /> Ligar </button>
                </divo>



                <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Message">
            <div className="itensModalMessage">
                    <h2>Fale conosco! </h2>

                    <form action="">
                        <span>Nome</span>
                        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
                        <span>Whatsapp</span>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <span>Email</span>
                        <input type="text" placeholder="seuemail@provedor.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </form>

                    <button onClick={() => handleNewContactModal("Whatsapp")}>Ir para Whatsapp</button>

            </div>
            </div>
            </Modal>
                <Modal isOpen={isOpenModalPhone} onRequestClose={handleCloseModalPhone}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalPhone}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-Message">
            <div className="itensModalMessage">
                    <h2>Fale conosco! </h2>

                    <form action="">
                        <span>Nome</span>
                        <input type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)}/>
                        <span>Telefone</span>
                        <input type="text" placeholder="(XX)XXXXX-XXXX" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <span>Email</span>
                        <input type="text" placeholder="seuemail@provedor.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </form>

                    <button onClick={() => handleNewContactModal("Ligação")}>Ir para Ligação</button>

            </div>
            </div>
            </Modal>
        </div>
    )
}