import "./messagesCounter.css"
import { useFetch } from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import api from "../../../services/api";


export function MessagesCounter({room}) {
  const Local = localStorage.getItem("adm-suachave");
  const user = JSON.parse(Local);

  const [dateReadyRooms, setDateReadyRooms] = useState([]);
  
  useEffect(() => {
    async function loadMessages() {
      await api.get(`/dateready/rooms/user/${room}/${user.id}`).then((res) => {

        if(res.data.length === 0) {
          createMessageReadData()
          return;
        }
        setDateReadyRooms(res.data)
      }).catch((err) => {
        console.log(err)
      });
    }

    async function createMessageReadData() {
      const data = {
        idUser: user.id,
        idRoom: room,
        dateReady: new Date()
      }
      await api.post(`/dateready/rooms`, data).then((res) => {
          console.log("Data criada")
      }).catch((err) => {
        console.log(err)
      })
    }

    loadMessages()
  },[])

  const {data} = useFetch(`/messages/${room}`)

  const filterMessages = data?.filter((filterData) => new Date(filterData?.created_at) > new Date(dateReadyRooms[0]?.dateReady)
                                                         && filterData?.idFriend === user.id)
  
    return (
      <>
      {filterMessages?.length === 0 ? "" :
      <div className="couterMessages">
      {filterMessages?.length}                                                    
      </div>
    }
      </>
    )
}