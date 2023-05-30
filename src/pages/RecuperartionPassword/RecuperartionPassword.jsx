import "./recuperationPassword.css";
import Logo from "../../assets/images/Logo2.png";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

export function RecuperationPassword() {
    const {email} = useParams();

    const {recoverPasswordNew} = useContext(AuthContext)

    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    function handleCreateAccount(e) {
        e.preventDefault();
    
        if(password !== confirmPassword) {
          toast.error("As senhas não combinam!");
          return
        }
        
        recoverPasswordNew(email, password)
        
      }
    

    return (
        <div className="RecuperationPassword">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <form action="">
                <img src={Logo} alt="Logo GPS Buscador" />
                    <div className="data">
                    <input type="text" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="text" placeholder="Confirmar Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

                        <button onClick={handleCreateAccount}>Gerar nova senha</button>
                    </div>
                </form>

            </div>
        </div>
    )
}