import "./menuAdm.css";
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"

export function MenuAdm() {
    return (
        <div className="MenuAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <h3>Outras opções</h3>
            <div className="informations">
                <div className="infoData">
                </div>
                <div className="infoData">
                </div>
                <div className="infoData">
                </div>
                <div className="infoData">
                </div>
            </div>
            </div>
        </div>
    )
}