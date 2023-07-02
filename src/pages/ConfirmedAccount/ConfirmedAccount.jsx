import "./confirmedAccount.css"
import Logo from "../../assets/images/Logo.png";
import Winners from "../../assets/images/svg/confirmed2.svg";
import { IoAlarmOutline } from "react-icons/io5";

export function ConfirmedAccount() {
    return(
        <div className="ConfirmedAccount">
            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Meus parabéns. <br />Sua conta foi criada com sucesso!</h2>

            <img src={Winners} alt="Notebook" />
            <div className="coming">
                <h4><IoAlarmOutline />Comece a publicar seus imóveis!</h4>

                <div className="buttons">
                <a href="/">Fazer primeiro login</a>
                </div>
            </div>
            

                
        </div>
    )
}