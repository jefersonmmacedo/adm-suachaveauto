import { useFetch } from "../../hooks/useFetch";

export function PropertiesCountAvailability({availability}) {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/autos/company/${user.id}`);

    const Rent = data?.filter((property) => property.availability === availability)
    
    return (
        <div className="PropertiesCountAvailability" style={{display: 'flex', flexDirection: 'row', marginLeft: '3px'}}>
            {Rent?.length} 
        </div>
    )
}