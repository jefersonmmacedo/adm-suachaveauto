import { useFetch } from "../../hooks/useFetch"
import { ViewAutoChat } from "../ViewAutoChat/ViewAutoChat"
import "./autoTopBarChat.css"

export function AutoTopBarChat({idAuto}) {

    const {data} = useFetch(`/autos/${idAuto}`)

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }
    return (
        <div className="UserTopBar">
            <div className="imageTop">
                <img src={data[0]?.featuredImage} alt={`Avatar do cliente ${data[0]?.name}`} />
            </div>
            <div className="textTop">
                <h5>{data[0]?.type}/{data[0]?.subType}</h5>
                <h6>{data[0]?.city} - {data[0]?.uf}</h6>

                <ViewAutoChat id={idAuto} mobile={true}/>
            </div>
      </div>
    )
}