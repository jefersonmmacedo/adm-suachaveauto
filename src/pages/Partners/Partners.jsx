import "./partners.css"
import NavbarAdm from "../../components/Nav/Navbar";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { MiniMenu } from "../../components/MiniMenu/MiniMenu";
import { useEffect, useState } from "react";
import api from "../../services/api";

export function Partners() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [plain, setPlain] = useState();
const [myPayment, setMyPayment] = useState();

  useEffect(() => {
      async function loadMyPlain() {
        await api.get(`/myplain/${user.id}`).then((res) => {
          loadPlains(res.data[0]?.idPlain)
          setMyPayment(res.data[0])
          console.log(res.data[0])
        })
      }
  
      async function loadPlains(id) {
        await api.get(`/plains/plain/${id}`).then((res) => {
          setPlain(res.data[0])
          console.log(res.data[0])
        })
      }
      loadMyPlain()
    }, [])


    return (
        <div className="Partners">
             <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <MiniMenu />
                <div className="textHome">
                    <h3>Integrações e Parcerias</h3>
                </div>
                
            <div className="informations">
                <dv className="infoData">
                    <h4>Integração com portais (Leads4Sales): </h4>
                    <h5> Link: https://sua-chave-api.herokuapp.com/property/integration/{user.id}</h5>
                </dv>
                <dv className="infoData">
                    <h4>Tour Virtual - Crie seu tour: </h4>
                    <h5> Acessar: <a href={myPayment?.namePlain === undefined || myPayment?.namePlain === "Basic" || myPayment?.namePlain === "Start" || myPayment?.namePlain === "Lite" ?
                            "/atualizar-plano/Tour"
                            : "#"}>ir para plataforma</a></h5>
                </dv>
            </div>
            </div>
        </div>
    )
}