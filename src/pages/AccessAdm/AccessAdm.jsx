import NavbarAdm from "../../components/Nav/Navbar";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import {IoDesktopOutline, IoBrowsersOutline, IoPhonePortraitOutline, IoEarthOutline, IoCalendarOutline, IoPersonOutline, IoQrCodeOutline, IoLaptopOutline, IoSettingsOutline, IoTimerOutline} from "react-icons/io5"
import "./accessAdm.css"
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { MiniMenu } from "../../components/MiniMenu/MiniMenu";

export function AccessAdm() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/acess/company/${user.id}`)
   
    return (
        <div className="AccessAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <MiniMenu />
                <h3>Histórico de acessos</h3>
            <div className="AccessList">

                {data?.map((access) => {
                    return (
                <div className="AccessListUnic">
                    <h5><span>{access.device === "Computador" ? <IoDesktopOutline /> : <IoPhonePortraitOutline />}</span> {access.device}</h5>
                    <h5><span><IoBrowsersOutline /></span> {access.browser}</h5>
                    <h5><span>IP:</span> {access.ipDevice}</h5>
                    <h5><span><IoEarthOutline/></span> <a href={`https://www.google.com/maps/@${access.latitude},${access.longitude},15z`} target="_blank">Ver localização</a></h5>
                    <h5 className="date"><span><IoCalendarOutline /></span> <DateFormat2 date={access.created_at} /></h5>
                </div>
                    )
                })}
            </div>
            </div>


           



        </div>
    )
}