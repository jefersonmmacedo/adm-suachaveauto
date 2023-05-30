import { useFetch } from "../../hooks/useFetch";

export function ClosuresCounter() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/proposals/company/${user.id}`);
    
    return (
        <div className="ClosuresCounter">
            {data?.length}
        </div>
    )
}