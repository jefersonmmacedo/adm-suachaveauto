import { IoCheckbox, IoCheckmarkCircle, IoCloseOutline } from "react-icons/io5";
import { Footer } from "../../components/Footer/Footer";
import Navbar2 from "../../components/Nav/Navbar";
import Modal from 'react-modal';
import "./checkout.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { storage } from '../../services/firebaseConnection';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {toast} from 'react-toastify';
import { v4 as uuidv4} from 'uuid';
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function Checkout() {
    const {id} = useParams();
    const {createPayment} = useContext(AuthContext);
    const [isOpenModalVoucher, setIsOpenModaVoucher] = useState(false);
    const Local = localStorage.getItem("suachave");
    const user = JSON.parse(Local);

    const [avatarUrl, setAvatarUrl] = useState(null);
    const [imageAvatar, setImageAvatar] = useState(''); 
    
    useEffect(() => {
        async function loadPlainSelected() {
            await api.get(`/plains/plain/${id}`).then((res) => {
                setPlain(res.data[0])
                console.log(res.data[0])
            }).catch((error) => {
                console.log(error)
            })
        }
        
        loadPlainSelected()
    }, [])
    const [plain, setPlain] = useState();


    function handleFile(e) {
        console.log(e.target.files[0])
        
        if(e.target.files[0]){
            const image = e.target.files[0];
            console.log(image)

             if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png'  || image.type === 'application/pdf') {
                setImageAvatar(image);
               setAvatarUrl(URL.createObjectURL(e.target.files[0]));
               console.log(avatarUrl);
               toast.success('Comprovante carregado com sucesso. Finalize seu pagamento!');
            } else {
                    toast.error('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png ou .PDF');
                    console.log('Tipo dearquivo não aceito. Envie uma imagem dos tipos: .jpg, .jpeg, .png');
                    setImageAvatar(null);
                    return null;
                }
        }
    }



    async function handleUploadVoucher(e) {
        e.preventDefault();
        if(avatarUrl === null) {
            toast.error("Favor anexar um comprovante Válido!");
            return;
        }
        toast.info("Salvando a foto. Aguarde...")
        const uuid = uuidv4();
        let newAvatarUrlFirebase = ref(storage, `images/comprovant/${uuid}`);
        
        let uploadAvatar = await uploadBytes(newAvatarUrlFirebase, imageAvatar);
        let photoUrlAvatar = await getDownloadURL(uploadAvatar.ref);
        
        console.log(uploadAvatar.ref.name, photoUrlAvatar);

        handleNewPayment(photoUrlAvatar)
    }



    function handleOpenModalVoucher(e) {
        e.preventDefault();
        console.log("Olá")
          setIsOpenModaVoucher(true)
        }
      
        function handleCloseModalVoucher(e) {
          e.preventDefault();
          setIsOpenModaVoucher(false);
        }

    function handleNewPayment(photoUrlAvatar) {
        const status = "Pendente"
        const status2 = "Ativo"
        const aceptTerms = "Sim"

        createPayment({
            idPlain: plain?.id, idCompany: user.id, email: user.email,
            namePlain: plain?.name, value: plain?.value, period: plain?.period,
            linkComprovant: photoUrlAvatar, aceptTerms, status, status2
        })
    }

    

    Modal.setAppElement('#root');
    return (
        <div className="Checkout">
            <Navbar2 />
            
            <div className="Payment">
            <div className="PlainSelected">
                    <h3>Plano Selecionado</h3>
                    <div className="plain">
                        <h4><span>Plano</span> {plain?.name}</h4>

                        <a href="/planos">Alterar plano</a>
                    </div>

                    <div className="text">
                    {plain?.infos.map((info) => {
                        return (
                            <p><IoCheckbox /> {info.info}</p>
                        )
                    })}
                   
                </div>
                <div className="pricePlain">
                    <p>Valor Total</p>
                    <h3>{plain?.value}/Mensal</h3>
                </div>
            </div>

            <div className="PaymentPlayn">
                <h3>Método de pagamento</h3>
                <p>Atualmente aceitamos pagamentos apenas via pix. Com pagamento efetuado via qr code e
                chave aleatória e envio de comprovante via site nas etapas a seguir</p>
                <br />
                <br />
                <p>Dados do Recebedor: INFINITY UP AGÊNCIA</p>
                <p>CNPJ: 22.322.664/0001-00</p>
                <br />
                <p>Recomendado: Adicionar o e-mail de cadastro na descrição do comprovante</p>

                <div className="Method">
                <h4>Escaneie o QR-CODE</h4>
                <img src={plain?.linkQrCode} alt="" />

                <h4>Chave aleatória</h4>
                <p>{plain?.keyPix}</p>
                </div>
                {/* <a href="/pagamentofinalizado">Enviar comprovante</a> */}
                <button onClick={handleOpenModalVoucher}>Enviar comprovante</button>
                <br />
                <p>Ao finalizar o pagamento você confirma que está de acordo com nossos termos de uso e política de privacidade</p>
            </div>
            </div>
            <Footer />


            <Modal isOpen={isOpenModalVoucher} onRequestClose={handleCloseModalVoucher}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModalVoucher}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-home-Voucher">
            <div className="itensModalHome-Voucher">

               
                <div className="infos">
                        <h5><IoCheckbox /> Não envie tela de confirmação.</h5>
                        <h5><IoCheckbox /> Não envie comprovante resumido.</h5>
                        <h5><IoCheckbox /> Não envie linha de extrato.</h5>
                        <h5><IoCheckbox /> Não rasure ou corte o comprovante.</h5>
                        <h5><IoCheckbox /> O envio de comprovante fora dos padrões poderá atrapalhar a validação.</h5>
                </div>
                <div className="infos2">
                        <h5><IoCheckbox /> Ao concluir a transação, clique no botão COMPROVANTE COMPLETO OU COMPARTILHAR COMPROVANTE.</h5>
                        <h5><IoCheckbox /> O comprovante deve estar completo.</h5>
                        <h5><IoCheckbox /> ENVIE COMPROVANTE EM PDF OU PRINT DO COMPROVANTE</h5>
                </div>
                <h6>Anexar comprovante:</h6>
                <input type="file" accept="application/pdf|image/*" onChange={handleFile} />

                <button onClick={handleUploadVoucher}>Enviar comprovante</button>
            </div>
            </div>
            </Modal>


        </div>
    )
}