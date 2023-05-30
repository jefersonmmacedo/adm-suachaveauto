import { useFetch } from "../../hooks/useFetch";

export function ProposalsCounter() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/contracts/company/${user.id}`);
    
    return (
        <div className="ProposalsCounter">
            {data?.length}
        </div>
    )
}