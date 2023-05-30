import { useFetch } from "../../hooks/useFetch";

export function PropertiesCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);
    
    return (
        <div className="PropertiesCount">
            {data?.length}
        </div>
    )
}