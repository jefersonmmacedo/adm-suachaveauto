import { useFetch } from "../../hooks/useFetch";

export function ProposalsCounter() {
    const Local = localStorage.getItem("adm-suachaveauto");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/proposals/company/${user.id}`);
    
    return (
        <div className="ProposalsCounter">
            {data?.length}
        </div>
    )
}