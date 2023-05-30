import { useFetch } from "../../hooks/useFetch";


export function CountersMatchProperty({status,type,subType,uf,city,district,bedroom,restroom,garage,suite,pets,furnished}) {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
    // const {data} = useFetch(
    //     `/property/list/match/${status}?type=${type}&subType=${subType}&uf=${uf}&city=${city}&district=${district}&bedroom=${bedroom}&restroom=${restroom}&garage=${garage}&suite=${suite}&pets=${pets}&furnished=${furnished}`
    //     );

    const {data} = useFetch(`/property/company/${user.id}`);

    if(!data) {
        return (
            <div className="CountersMatchProperty">
                0
            </div>
        )
    }

    const filterMatch = data?.filter((match) => 
                        match.status === status &&
                        match.type === type &&
                        match.subType === subType &&
                        match.uf === uf &&
                        match.city === city &&
                        match.district === district &&
                        match.bedroom === bedroom &&
                        match.restroom === restroom &&
                        match.garage === garage &&
                        match.suite === suite &&
                        match.pets === pets &&
                        match.furnished === furnished
                        )

    return (
        <div className="CountersMatchProperty" style={{marginRight: '2px'}}>
           {filterMatch?.length } 
        </div>
    )
}

