import { useFetch } from "../../hooks/useFetch"

export function CountersAlert({id}) {
    const {data} = useFetch(`/alertClient/property/${id}`);


    if(!data) {
        return (
            <div className="CountersAlert">
                0
            </div>
        )

    }
    return (
        <div className="CountersAlert" style={{marginRight: '2px'}}>
           {data?.length}
        </div>
    )
}