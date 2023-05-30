import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./updatesSystem.css";


export function UpdatesSystem() {


    return (
        <div className="UpdatesSystem">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
                <h3>Atualizações do sistema</h3>
                </div>

                <div className="listUpdates">
                <h2>Ultimas atualizações</h2>
                <h4>Fique tranquilo(a). Assim que estivermos prontos nós avisaremos</h4>
                </div>
            </div>
            </div>

    )
}