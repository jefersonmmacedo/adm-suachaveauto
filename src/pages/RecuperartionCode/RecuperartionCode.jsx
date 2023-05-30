import "./recuperationCode.css";
import Logo from "../../assets/images/Logo2.png";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function RecuperationCode() {
    const {email} = useParams();

    const  {validadeCodeRecuperation} = useContext(AuthContext)

    const [code, setCode] = useState("");


    function handleRecuperationCode(e) {
        e.preventDefault();
       validadeCodeRecuperation(code.toLocaleLowerCase(), email);
      }

      
    return (
        <div className="RecuperationCode">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <form action="">
                <img src={Logo} alt="Logo GPS Buscador" />
                    <div className="data">
                    <input type="text" placeholder="######" value={code.toLocaleLowerCase()} onChange={e => setCode(e.target.value)}/>

                    <div className="message">
                         <h5>Digite o código que enviamos para o seu e-mail.</h5>
                       </div>

                        <button onClick={handleRecuperationCode}>Confirmar código</button>
                    </div>
                </form>

            </div>
        </div>
    )
}