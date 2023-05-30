import "./recuperation.css";
import Logo from "../../assets/images/Logo2.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import { v4 as uuidv4 } from 'uuid'
import { IoAlertCircleOutline } from "react-icons/io5";

export function Recuperation() {
    const  {gerateCodeRecuperation} = useContext(AuthContext)
    const [email, setEmail] = useState("");

    function handleCreateCodeRecuperation(e) {
        e.preventDefault();
        const generateCode = uuidv4()
        const code = generateCode.substring(0, 6)
       gerateCodeRecuperation(email.replace(/\s+/g, ''), code)
      }


    return (
        <div className="Recuperation">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <form action="">
                <img src={Logo} alt="Logo Sua Chave" />
                    <div className="data">
                        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                        <div className="message">
                         <h5>Enviaremos um código de recuperação <br /> para o e-mail informado.</h5>
                       </div>

                        <button onClick={handleCreateCodeRecuperation}>Solicitar código</button>
                    </div>
                </form>

            </div>
        </div>
    )
}