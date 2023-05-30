import { useFetch } from "../../hooks/useFetch";

export function PropertiesCountAvailability({availability}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/property/company/${user.id}`);

    const Rent = data?.filter((property) => property.availability === availability)
    
    return (
        <div className="PropertiesCountAvailability" style={{display: 'flex', flexDirection: 'row', marginLeft: '3px'}}>
            {Rent?.length}
        </div>
    )
}