import { useFetch } from "../../hooks/useFetch";

export function PropertiesCountRentSale() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);

    const Rent = data?.filter((property) => property.availability === "Vendido" || property.availability === "Alugado")

   
    return (
        <div className="PropertiesCountRentSale">
            {Rent?.length}
        </div>
    )
}
