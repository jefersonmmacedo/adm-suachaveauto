import { useFetch } from "../../hooks/useFetch";

export function EvaluationCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/evaluation/company/${user.id}`);
    
    return (
        <div className="EvaluationCount">
            {data?.length}
        </div>
    )
}