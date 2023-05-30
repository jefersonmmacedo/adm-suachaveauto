import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { Notification } from "../../components/Notification/Notifications";
import "./notificationsAdm.css"
import { useFetch } from "../../hooks/useFetch";

export function NotificationsAdm() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/notification/${user.id}`)

    return (
        <div className="NotificationsAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <h3>Notificações e Alertas</h3>
            <div className="informations">
            {data?.map((notification) => {
                return (
                    <Notification text={notification.text} link={notification.link}/>
                )
            })}
            </div>
            </div>
        </div>
    )
}