import { useFetch } from "../../hooks/useFetch"

export function CountersFavorites({id}) {

    const {data} = useFetch(`/favorite/property/${id}`)

    if(!data) {
        return (
            <div className="CountersFavorites">
                0
            </div>
        )

    }
    return (
        <div className="CountersFavorites" style={{marginRight: '2px'}}>
            {data.length}
        </div>
    )
}