import { useFetch } from "../../hooks/useFetch";

export function PropertiesCountSale() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/autos/company/${user.id}`);

    const Sale = data?.filter((property) => property.status === "Venda")
    
    return (
        <div className="PropertiesCountSale" style={{display: 'flex', flexDirection: 'row', marginRight: '3px'}}>
            {Sale?.length}
        </div>
    )
}