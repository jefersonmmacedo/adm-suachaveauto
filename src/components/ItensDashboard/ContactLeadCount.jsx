import { useFetch } from "../../hooks/useFetch";

export function ContactLeadCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/contact/company/${user.id}`);

    
    return (
        <div className="ContactLeadCount">
            {data?.length}
        </div>
    )
}

