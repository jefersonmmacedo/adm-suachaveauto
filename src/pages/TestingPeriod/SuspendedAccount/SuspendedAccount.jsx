import "./suspendedAccount.css";
import Logo from "../../../assets/images/Logo.png";
import block from "../../../assets/images/svg/block.svg";
import { IoLogOutOutline, IoLogoWhatsapp } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth";

export function SuspendedAccount() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const { logout } = useContext(AuthContext);

    function handleLogOut() {
      logout()
    }
    
    return (
        
        <div className="SuspendedAccount">
            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Olá, {user.fantasyName}</h2>
            <h4>Sus conta foi suspensa por falta de pagamento.</h4>

            <img src={block} alt="Carinha triste" />

            <div className="coming">
            <h5>Escolha o que deseja fazer</h5>

            <div className="buttons">
                <a href="/novoplano">Escolher um plano</a>
                {/* <a href="/">Continuar teste gratuito</a> */}
                <a href="/cancelar-conta">Cancelar minha conta</a>
            </div>
            <div className="buttons">
                <a href="https://wa.me/5521997429585?text=Olá. Gostaria de falar sobre minha conta" className="whats" target="_Blank" rel="noreferrer"> <IoLogoWhatsapp/> Fale com nossa equipe</a>
                <button  className="logout" onClick={handleLogOut}> <IoLogOutOutline/> Sair</button>
            </div>
            </div>
          
        </div>
    )
}