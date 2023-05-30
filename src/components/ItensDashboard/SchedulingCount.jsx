import { useFetch } from "../../hooks/useFetch";

export function SchedulingCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/scheduling/company/${user.id}`);

    const scheduler = data?.filter((property) => new Date(property.create_at).getDate() === new Date().getDate()
                                            && new Date(property.create_at).getMonth() + 1 === new Date().getMonth() + 1
                                            && new Date(property.create_at).getFullYear() === new Date().getFullYear())
    
    return (
        <div className="SchedulingCount">
            {scheduler?.length}
        </div>
    )
}
