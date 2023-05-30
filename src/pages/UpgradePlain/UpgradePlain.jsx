import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./upgradePlain.css";
import { useEffect, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useFetch } from "../../hooks/useFetch";
import imageSite from "../../assets/images/svg/payment2.svg";
import Logo from "../../assets/images/Logo.png";
import api from "../../services/api";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";
import { useParams } from "react-router-dom";

export function UpgradePlain() {
    const {plainName} = useParams();
    console.log(plainName);

    const [plains, setPlains] = useState([]);

    const { logout } = useContext(AuthContext);

    function handleLogOut() {
      logout()
    }


    useEffect(() => {
        async function plainsLoad() {
            await api.get("/plains").then((res) => {
                setPlains(res.data);
                console.log(res.data);
            }).catch((error) => {
                console.log(error)
            })
        }

        plainsLoad()
    },[])

    function handleRedirect(data) {
        window.open(`${data}`, "_self");
    }

    const plainsFilter = plains.filter((plain) => plain.name === plainName )


    return (
        <div className="UpgradePlain">
            <div className="aside">
                <div className="solicitation">
                <div className="logo">
              <img src={Logo} alt="Logo sua chave" />
            </div>
                <h2>Atualizar plano</h2>
                <h4>A função que deseja acessar, só está disponível a partir do plano {plainName}. <br /> Que tal fazer um upgrade e ter acesso a todas as funcionalidades de nosso sistema?</h4>

                <div className="blockCenter">
                    <div className="image">
                        <img src={imageSite} alt="Imagem de um personagem editando um site com a mão" />
                        <button className="btnSolicitation" onClick={() => handleRedirect("/novoplano")}>Ver mais planos</button>
                        <button className="btnClose" onClick={() => handleRedirect("/home")}>Voltar ao painel</button>
                    </div>
                    
                    <div className="myPlain">
                    <div className={"plain"} key={plainsFilter[0]?.id}>
                        <h3>{plainsFilter[0]?.name}</h3>
                        {plainsFilter[0]?.valueNew === "" ?
                        <>
                            <div className="title">
                            <h1>R$ {plainsFilter[0]?.value}</h1>
                            <h4>/mês</h4>
                            </div>
                        </>
                        :
                        <>
                            <div className="title2">
                            <h1>R$ {plainsFilter[0]?.value}</h1>
                            <h6>/mês</h6>
                            </div>
                            <div className="title">
                            <h1>R$ {plainsFilter[0]?.valueNew}</h1>
                            <h4>/mês</h4>
                            </div>
                        </>

                        }
                        <div className="text">
                        {plainsFilter[0]?.infos.map((info) => {
                            return (
                                <p><IoCheckmarkOutline /> {info.info}</p>
                            )
                        })}
                        </div>

                        <a href={`/plano/${plainsFilter[0]?.id}`}>Contratar plano</a>
                        <p>{plainsFilter[0]?.note}</p>
                        {plainsFilter[0]?.name === "Lite" ? 
                            <div className="featured">
                                <h5>Mais Procurado</h5>
                            </div>
                            : ""}
                        </div>
                    </div>
                </div>
                <div className="buttons">
                
                {/* <button className="btnClose" onClick={handleLogOut}>Sair</button> */}
                </div>
                </div>
            </div>
            </div>

    )
}