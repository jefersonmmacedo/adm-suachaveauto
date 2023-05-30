import { BiUserPin } from "react-icons/bi";
import "./miniMenuAccounts.css"
import { IoCalendarOutline, IoExtensionPuzzleOutline, IoLaptopOutline, IoPeopleOutline, IoPersonOutline, IoQrCodeOutline, IoSettingsOutline, IoTimerOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GiKeyring } from "react-icons/gi";



export function MiniMenuAccounts() {
    return (
      <div className="MiniMenuAccounts">
        <div className="textMimiMenu">
          <h3>Cadastros</h3>
        </div>
        <div className="buttonsAccount">
        <a href="/proprietarios"><GiKeyring />Proprietários</a>
        <a href="/clientes"><AiOutlineUsergroupAdd /> Clientes</a>
        <a href="/fiadores"><BiUserPin />Fiadores</a>
      </div>
      </div>
    )
}

