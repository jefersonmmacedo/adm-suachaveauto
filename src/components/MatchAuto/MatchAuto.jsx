import "./matchAuto.css"
import { useState } from "react";
import { IoCallOutline, IoEyeOutline, IoLogoWhatsapp, IoMailOutline, IoMapOutline } from "react-icons/io5";
import { useFetch } from "../../hooks/useFetch";
import { HiOutlineBellAlert } from "react-icons/hi2";


export function MatchAuto({id}) {
    const [filter, setFilter] = useState(false);
    const {data} = useFetch(`/alertClient/autos/${id}`);

    if(!data) {
        return (
            <div className="CountersAlert">
                0
            </div>
        )
    }

          function handleFiltro(e) {
            e.preventDefault();
    
            setFilter(!filter)
            console.log(!filter)
        }

    return (
        <div className="MatchAuto">
            <div className="infoUnicData" onClick={handleFiltro}>
                <HiOutlineBellAlert />
                    <h6>{data?.length} Alertas deste auto</h6>
            </div>


        <div className={filter === true ? "viewMatch" : "viewMatchNone"}>
        <div className="buttonsMatch">
        <button className="btnMatch" onClick={handleFiltro}>X</button>
        </div>
        <div className="dataMatch">
            <h3>Alertas criados a partir deste auto</h3>
            {data.length === 0 ? "0" :
            
            data?.map((user) => {
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