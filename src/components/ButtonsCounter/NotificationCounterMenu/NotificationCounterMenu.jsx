import "./notificationCounterMenu.css"
import { IoNotificationsOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useEffect } from "react";
import api from "../../../services/api";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";

export function NotificationCounterMenu() {
  const Local = localStorage.getItem("adm-suachave");
  const user = JSON.parse(Local);

  const [dateReadyNotifications, setDateReadyNotifications] = useState([])
  
  useEffect(() => {
    async function loadNotifications() {
      await api.get(`/dateready/notifications/user/${user.id}`).then((res) => {

        if(res.data.length === 0) {
          createMessageReadData()
          return;
        }
        setDateReadyNotifications(res.data)
      }).catch((err) => {
        console.log(err)
      });
    }

    async function createMessageReadData() {
      const data = {
        idUser: user.id,
        dateReady: new Date()
      }
      await api.post(`/dateready/notifications`, data).then((res) => {
          console.log("Data criada")
      }).catch((err) => {
        console.log(err)
      })
    }

    loadNotifications()
  },[])

  const {data} = useFetch(`/notification/${user.id}`);

  const filterNotifications = data?.filter((filterData) => new Date(filterData?.created_at) > new Date(dateReadyNotifications[0]?.dateReady))
                                            
  async function HandleOpenLink(link) {
    const data = {
      idUser: user.id,
      dateReady: new Date()
    }
      await api.patch(`/dateready/notifications/update/${dateReadyNotifications[0]?.id}`, data).then(() =>{
        window.open(`${link}`, "_self")
      }).catch((err) => {
        console.log(err)
      });
    }

    return (
       <div className="buttonCounterMenu" onClick={() => HandleOpenLink("/notificacoes")}>
        {filterNotifications?.length === 0 ? "" :
          <div className="counter">
          {filterNotifications?.length}                                                    
        </div>
      }
            </div>
    )
}