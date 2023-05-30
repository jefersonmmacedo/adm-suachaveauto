import "./chatUnicMessage.css";
import { MessagesBudget } from "../MessagesBudget/MessagesBudget";
import Navbar2 from "../Nav/Navbar";

export function ChatUnicMessage() {
    return (
        <div className="ChatUnicMessage">
            <Navbar2 />
            <div className="newMessage">
            <textarea name="" id="" cols="30" rows="5" placeholder="Escreva sua mensagem"></textarea>
            <button className="btn-message">Enviar mensagem</button>
            </div>
        </div>
    )
}