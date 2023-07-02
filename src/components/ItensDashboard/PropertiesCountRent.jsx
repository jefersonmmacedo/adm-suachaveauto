import { useFetch } from "../../hooks/useFetch";

export function PropertiesCountRent() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/autos/company/${user.id}`);

    const Rent = data?.filter((property) => property.status === "Aluguel")
    
    return (
        <div className="PropertiesCountRent" style={{display: 'flex', flexDirection: 'row', marginRight: '3px'}}>
            {Rent?.length}
        </div>
    )
}