import { useFetch } from "../../hooks/useFetch";

export function ContactPhoneCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/contact/company/${user.id}`);

    const Contact = data?.filter((contactUser) => contactUser.type === "Ligação" )
    
    return (
        <div className="ContactPhoneCount">
            {Contact?.length}
        </div>
    )
}

