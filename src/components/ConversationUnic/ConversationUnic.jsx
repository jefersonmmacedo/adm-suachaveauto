import "./conversationUnic.css"
import { useState, useEffect } from "react";
import api from "../../services/api";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { MessageUnicConversation } from "../MessageUnicConversation/MessageUnicConversation";
import { MessagesCounter } from "../ButtonsCounter/MessagesCounter/MessagesCounter";

export function ConversationUnic({idProperty, idClient, idCompany, room,roomLink}) {
    const [client, setClient] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function loadClient() {
            api.get(`/client/unicid/${idClient}`).then((res) => {
                setClient(res.data[0])
            }).catch((error) => {
                console.log(error);
            });
        }

        loadClient()
        
        async function loadMessages() {
            api.get(`/messages/${room}`).then((res) => {
                setMessages(res.data[0])
            }).catch((error) => {
                console.log(error);
            });
        }

        loadMessages()

    },[])
    const profile = "https://firebasestorage.googleapis.com/v0/b/foursome4-b925c.appspot.com/o/avatar.png?alt=media&token=f3b1f0bc-3885-4296-8363-ec1c3d43e240"
    return (
        <a className={"direction"} href={`/chat/${room}/${idProperty}/${idCompany}/${idClient}`}>
            <div className={roomLink === room ? "select": "conversationUnic"}>
            <div className="imageUnic">
            <img src={client?.avatar} alt="" />
            </div>
            <div className="textUnic">
            <h5>{client?.name}</h5>
            {messages === undefined ? 
            <h6>Sem mensagens enviadas</h6>
            :
            <MessageUnicConversation room={room}/>
            }
            </div>
            </div>
            <MessagesCounter room={room}/>
            </a>
        )
}


