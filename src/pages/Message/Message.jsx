import "./message.css";
import { MessagesBudget } from "../../components/MessagesBudget/MessagesBudget";
import Navbar2 from "../../components/Nav/Navbar";

export function Message() {
    return (
        <div className="Message">
            <Navbar2 />
            <MessagesBudget />
            <div className="newMessage">
            <textarea name="" id="" cols="30" rows="5" placeholder="Escreva sua mensagem"></textarea>
            <button className="btn-message">Enviar mensagem</button>
            </div>
        </div>
    )
}