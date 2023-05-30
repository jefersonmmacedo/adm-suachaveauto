import "./notifications.css"
import Navbar2 from "../../components/Nav/Navbar";
import { Notification } from "../../components/Notification/Notifications";
import { Footer } from "../../components/Footer/Footer";
import { useFetch } from "../../hooks/useFetch";

export function Notifications() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/notification/${user.id}`)

    if(data) {
        console.log(data)
    }
    
    return (
        <div className="Notifications">
            <Navbar2 />

            <h2>Notificações</h2>

            {data?.map((notification) => {
                return (
                    <Notification text={notification.text} link={notification.link}/>
                )
            })}

            <div className="space"></div>

            <Footer />
        </div>
    )
}
