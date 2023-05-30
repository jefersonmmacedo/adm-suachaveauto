import { useFetch } from "../../hooks/useFetch";

export function ContactWhatsappCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/contact/company/${user.id}`);

    const Contact = data?.filter((contactUser) => contactUser.type === "Whatsapp" )
    
    return (
        <div className="ContactWhatsappCount">
            {Contact?.length}
        </div>
    )
}

