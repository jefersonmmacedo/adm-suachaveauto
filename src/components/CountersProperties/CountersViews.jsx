﻿import { useFetch } from "../../hooks/useFetch"

export function CountersViews({id}) {
    const {data} = useFetch(`/viewAuto/auto/${id}`)

    if(!data) {
        return (
            <div className="CountersViews">
                0
            </div>
        )
    }

    return (
        <div className="CountersViews" style={{marginRight: '2px'}}>
            {data.length} 
        </div>
    )
}