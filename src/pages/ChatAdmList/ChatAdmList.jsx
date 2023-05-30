
import "./chatAdmList.css";
import NavbarAdm from "../../components/Nav/Navbar";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { ConversationsList } from "../../components/ConversationsList/ConversationsList";

export function ChatAdmList() {
    return (
        <div className="ChatAdmList">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Chat de mensagens</h3>
                {/* <a className="link" href="/novoimovel">+ Nova venda</a> */}
                </div>
            <div className="informations">
                <ConversationsList />
            </div>
            </div>
        </div>
    )
}