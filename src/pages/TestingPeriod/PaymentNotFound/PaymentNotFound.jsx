import "./paymentNotFound.css";
import Logo from "../../../assets/images/Logo.png";
import payment from "../../../assets/images/svg/payment.svg";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth";
import { IoLogOutOutline } from "react-icons/io5";

export function PaymentNotFound() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const { logout } = useContext(AuthContext);

    function handleLogOut() {
      logout()
    }

 
    return (
        <div className="PaymentNotFound">
            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Olá, {user.fantasyName}</h2>
            <h4>Seu pagamento encontra-se pendente.</h4>

            <img src={payment} alt="Carinha triste" />

            <div className="coming">
                <h5>Fale com nosso time comercial e solicite um novo bolix (Boleto com PIX).</h5>

                <div className="buttons">
                    <a href="https://wa.me/5521997429585?text=Olá. Gostaria de solicitar um novo boleto para efetuar o pagamento de minha mensalidade" target="_Blank">Falar com time comercial</a>
                    <button  className="logout" onClick={handleLogOut}> <IoLogOutOutline/> Sair</button>
                </div>
            </div>
        </div>
    )
}