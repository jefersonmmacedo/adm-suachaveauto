import { useFetch } from "../../hooks/useFetch";

export function FavoriteCount() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/favorite/company/${user.id}`);

    
    return (
        <div className="FavoriteCount">
            {data?.length}
        </div>
    )
}
