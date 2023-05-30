import { useFetch } from "../../hooks/useFetch";

export function SchedulingAll() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/scheduling/company/${user.id}`);

    
    return (
        <div className="SchedulingAll">
            {data?.length}
        </div>
    )
}
