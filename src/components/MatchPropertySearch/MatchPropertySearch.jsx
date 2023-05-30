import "./matchPropertySearch.css"
import { useState } from "react";
import { IoCallOutline, IoEyeOutline, IoLogoWhatsapp, IoMailOutline, IoMapOutline } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { ImConnection } from "react-icons/im";


export function MatchPropertySearch({status,type,subType,uf,city,district,bedroom,restroom,garage,suite,pets,furnished}) {
    const [filter, setFilter] = useState(false);
    const {data} = useFetch(`searchClient`);

    if(data) {
        console.log(data);
    }

    if(!data) {
        return (
            <div className="CountersAlert">
                <div className="infoUnicData" onClick={handleFiltro}>
                <ImConnection />
                    <h6>Carregando Matchs</h6>
            </div>
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
    match.suite === suite
    )

    console.log("Props")
    console.log({status,type,subType,uf,city,district,bedroom,restroom,garage,suite,pets,furnished})

    console.log("filterMatch")
    console.log(filterMatch)

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="MatchPropertySearch">
            <div className="infoUnicData" onClick={handleFiltro}>
                <ImConnection />
                    <h6>{filterMatch?.length} Matchs</h6>
            </div>


        <div className={filter === true ? "viewMatchSearch" : "viewMatchSearchNone"}>
        <div className="buttonsMatch">
        <button className="btnMatch" onClick={handleFiltro}>X</button>
        </div>
        <div className="dataMatch">
            <h3>Usuários que buscam um imóvel como este</h3>
            {filterMatch.length === 0 ? "" :
            
            filterMatch?.map((user) => {
                return (
                    <div className="user">
                            <h4>{user.name}</h4>
                            <div className="text">
                            <h5><IoLogoWhatsapp/> {user.whatsapp}</h5>
                            <h5>|</h5>
                            <h5><IoMailOutline/> {user.email}</h5>
                            </div>
                    </div>
                )
            })
                
            }

        </div>
    </div>
        </div>
    )
}