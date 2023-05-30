import { useFetch } from "../../hooks/useFetch";

export function SchedulingAllCompleted() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/scheduling/company/${user.id}`);

    const scheduler = data?.filter((property) => property.status === "Completa")
    
    return (
        <div className="SchedulingAllCompleted">
            {scheduler?.length}
        </div>
    )
}
