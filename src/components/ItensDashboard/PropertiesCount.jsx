import { useFetch } from "../../hooks/useFetch";

export function PropertiesCount() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/autos/company/${user.id}`);
    
    return (
        <div className="PropertiesCount">
            {data?.length}
        </div>
    )
}