import "./conversationsList.css"
import { ConversationUnic } from "../ConversationUnic/ConversationUnic";
import { useFetch } from '../../hooks/useFetch';
import { IoChatboxOutline, IoChatbubbleOutline } from "react-icons/io5";
import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { MessagesCounter } from "../ButtonsCounter/MessagesCounter/MessagesCounter";

export function ConversationsList({roomLink}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [dateMessage, setDateMessage] = useState([])

    // const {data} = useFetch(`/rooms/company/${user.id}`);

    // if(data) {
    //     console.log(data)
    // }
    // if(!data) {
    //     return (
    //         <h5>Carregando</h5>
    //     )
    // }

    
    

    useEffect(() => {
        async function LoadRooms() {
        const res = await api.get(`/rooms/company/${user.id}`);
             
        res.data.forEach((chatLists) => {
                async function RoomsAndLastDate() {            
                    const result = await api.get(`/messages/${chatLists.room}`)

                    const dados = {
                        dateLastMessage: result.data[0].created_at,
                        id: chatLists.id,
                        room: chatLists.room,
                        idCompany: chatLists.idCompany,
                        idClient: chatLists.idClient,
                        idProperty: chatLists.idProperty,
                        imageProperty: chatLists.imageProperty,
                        created_at: chatLists.created_at
                    } 

                   setDateMessage(oldDateMessage => [...oldDateMessage, dados]);
    
                }

                RoomsAndLastDate()

           })

        }


        LoadRooms();

        
    }, []);

    

console.log("dateMessage")
console.log(dateMessage)


if(dateMessage) {
    dateMessage.sort(function(a,b) {
        if(a.dateLastMessage > b.dateLastMessage ) {
            return -1
        } else {
            return true
        }
    })
}


    return (
        <div className="ConversationsList">
            {dateMessage?.map((chat) => {
                return (
                        <>
                        <ConversationUnic idProperty={chat.idProperty} idClient={chat.idClient} idCompany={chat.idCompany} roomLink={roomLink} room={chat.room} key={chat.id}/>
                        </>
                )
            })}
        </div>
    )
}