import { useFetch } from "../../hooks/useFetch"
import { ViewPropertyChat } from "../ViewPropertyChat/ViewPropertyChat"
import "./propertyTopBarChat.css"

export function PropertyTopBarChat({idProperty}) {

    const {data} = useFetch(`/property/${idProperty}`)

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

                <ViewPropertyChat id={idProperty} mobile={true}/>
            </div>
      </div>
    )
}