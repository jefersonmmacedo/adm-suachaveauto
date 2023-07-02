import "./signInCompany.css";
import Logo from "../../assets/images/Logo2.png";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/Auth";
import {IoEyeOutline, IoEyeOffOutline, IoAlertCircleOutline} from 'react-icons/io5';
import apiIpUser from "../../services/api-ipUser";

export function SignInCompany() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);
 
  
    if(user !== null ) {
      window.open("/home", "_self");
    }



    const navigate = useNavigate();

    const [passwordView, setPasswordView] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loginSessionCompany, loading} = useContext(AuthContext);

    const [device, setDevice] = useState("")
    const [browser, setBrowser] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [ipDevice, setIpDevice] = useState("")

    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }
  
        function success(position) {
            const lat1  = position.coords.latitude;
            const long1 = position.coords.longitude;
        
            setLatitude(lat1);
            setLongitude(long1);
            
          }

      function error() {
        console.log('Unable to retrieve your location');
      }
  
      function newDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            console.log('Dispositivo Movel');
            setDevice("Dispositivo Movel")
        } else {
            setDevice("Computador")
        }
    }

    function GetBrowserInfo() {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
       
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
       
        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6
        if (isOpera) {
            return 1;
        }
        else if (isFirefox) {
            setBrowser("Firefox")
            return 2;
        }
        else if (isChrome) {
            setBrowser("Chrome")
            return 3;
        }
        else if (isSafari) {
            setBrowser("Safari")
            return 4;
        }
        else if (isIE) {
            setBrowser("Internet Exploreer")
            return 5;
        }
        else {
            return 0;
        }
    }
    
    async function getLoadIP() {
        await apiIpUser.get().then((res) => {
            setIpDevice(res.data);
            return
        }).catch((error) => {
            console.log(error);
            return
        })
    }
          getLocation()
          newDevice() 
          GetBrowserInfo()
          getLoadIP()
    },)


    useEffect(() => {
        if(localStorage.getItem("suachave") !== null) {
          navigate("/home")
        }
      },[navigate]);

      function handleLogin() {
        loginSessionCompany({email, password, device, browser, latitude, longitude, ipDevice})
        console.log({email, password})
      }

      
      function handlePasswordView() {
        if(passwordView === false) {
          setPasswordView(true)
        } else {
          setPasswordView(false)
        }
      }
      
    return (
        <div className="SignInCompany">
            <div className="professional">
                <div className="block">
                </div>
            </div>
            <div className="login">
                <div className="form">
               
                <img src={Logo} alt="Logo GPS Buscador" />
                    <div className="data">
                        <input type="text" placeholder="Email ou ID" value={email} onChange={e => setEmail(e.target.value)}/>
                        <div className="dataInputs">
                        <input type={passwordView === false ? "password" : "text"}  placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="icon" onClick={handlePasswordView}>{passwordView === false ? <IoEyeOutline /> : <IoEyeOffOutline /> }
                        </div>
                        </div>
                        {
                          loading === true ? "" :
                        <div className="message">
                          <h5><IoAlertCircleOutline /> Login ou senha incorretos. Verifique e tente novamente</h5>
                        </div>
                        }
                        <div className="links">
                            <p> <a className="link" href="/recuperar">Recuperar senha</a></p>
                        </div>
                        <button onClick={handleLogin}>Entrar</button>
                        {/* <a href="/cadastrar">Cadastre-se aqui!</a> */}

                    </div>
                    </div>

            </div>
        </div>
    )
}