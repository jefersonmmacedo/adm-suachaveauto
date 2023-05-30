import { useEffect, useState } from "react";
import api from "../../services/api";
import "./miniMenu.css"
import { IoCalendarOutline, IoCloseCircle, IoExtensionPuzzleOutline, IoLaptopOutline, IoPeopleOutline, IoPersonOutline, IoQrCodeOutline, IoSettingsOutline, IoTimerOutline } from "react-icons/io5";



export function MiniMenu() {
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
        <div className="buttonsAccount">
        <a href="/minhaconta"><IoPersonOutline /> Minha conta</a>
        <a href="/meus-planos"><IoQrCodeOutline />Meu plano</a>
        <a href="/configurar-agendamento"><IoCalendarOutline />Configuração de agenda</a>
        <a href="/integracoes"><IoExtensionPuzzleOutline />Integrações</a>
        <a href={myPayment?.namePlain === undefined || myPayment?.namePlain === "Start" ?
                            "/atualizar-plano/Lite"
                            : "/equipe"}><IoPeopleOutline />Equipe</a>
        <a href="#"><IoSettingsOutline />Opções</a>
        <a href="/historico"> <IoTimerOutline />Histórico</a>
        <a href="/cancelar-conta" className="cancel"> <IoCloseCircle />Cancelar conta</a>
      </div>
    )
}
