import "./testingPeriodInitial.css";
import Logo from "../../../assets/images/Logo.png";
import testing from "../../../assets/images/svg/testing.svg";
import { IoLogOutOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth";

export function TestingPeriodInitial() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    
    const { logout } = useContext(AuthContext);

    function handleLogOut() {
      logout()
    }


 const d1  = new Date(user.date);
const d2 = new Date();
const diffInMs   = new Date(d2) - new Date(d1)
const diffInDays = parseInt(diffInMs / (1000 * 60 * 60 * 24));
console.log(diffInDays)
    

    return (
        
        <div className="TestingPeriodInitial">

            <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
            
            <h2>Olá, {user.fantasyName}</h2>
            <h4>Você está no período de testes. Faltam {7 - diffInDays} dias para terminar.</h4>
          

            <img src={testing} alt="Carinha triste" />

            <div className="coming">
            <h5>Aproveite tudo que preparamos para axiliar em seu dia a dia</h5>

            <div className="buttons">
                <a href="/home">Ir para o meu painel</a>
                <a href="/novoplano" className="update">Assinar agora</a>
                <button  className="logout" onClick={handleLogOut}> <IoLogOutOutline/> Sair</button>
            </div>
            </div>
          
        </div>
    )
}