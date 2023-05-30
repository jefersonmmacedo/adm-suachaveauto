import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myPropertiesList.css";
import { IoCreateOutline, IoLocationOutline, IoEyeOutline, IoHeartOutline, IoLogoWhatsapp, IoCallOutline, IoHomeOutline, IoInfiniteOutline} from 'react-icons/io5';
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { EditStatusProperty } from "../../components/EditStatusProperty/EditStatusProperty";
import { CountersViews } from "../../components/CountersProperties/CountersViews";
import { CountersFavorites } from "../../components/CountersProperties/CountersFavorites";
import { CountersContact } from "../../components/CountersProperties/CountersContact";
import { CountersWhatsapp } from "../../components/CountersProperties/CountersWhatsapp";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { DeleteProperty } from "../../components/DeleteProperty/DeleteProperty";
import { ViewPropertyList } from "../../components/ViewPropertyList/ViewPropertyList";
import { MatchProperty } from "../../components/MatchProperty/MatchProperty";
import { MatchPropertySearch } from "../../components/MatchPropertySearch/MatchPropertySearch";

export function MyPropertiesList() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [type, setType] = useState("");
    const [subType, setSubType] = useState("");
    const [availability, setAvailability] = useState("");
    const [status, setStatus] = useState("");
    const [emphasis, setEmphasis] = useState(false);
    const [plains, setPlains] = useState("");

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    useEffect(() => {
        async function loadPaymet() {
            await api.get(`/myplain/${user.id}`).then((res) => {
                setPlains(res.data[0]);
                console.log(res.data[0]);
            }).catch((err) => {
                console.error(err);
            });
        }

        loadPaymet()
    },[])

    const {data} = useFetch(`/property/company/${user.id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    function handleEmphasis(e) {
        
        if(e.target.value === "true") {
            setEmphasis(true)
            setStatus("")
            setSubType("")
            setType("")
            setAvailability("")
            setSearch("")
        } else {
            setEmphasis(false)
            setStatus("")
            setSubType("")
            setType("")
            setAvailability("")
            setSearch("")
        }
        console.log(e.target.value)
    }
    function handleType(e) {
        setType(e.target.value)
        console.log(e.target.value)
    }
    function handleSubType(e) {
        setSubType(e.target.value)
        console.log(e.target.value)
    }

    function handleStatus(e) {
        setStatus(e.target.value)
        console.log(e.target.value)
    }
    function handleAvailability(e) {
        setAvailability(e.target.value)
        console.log(e.target.value)
    }
    function handleClear() {
        setStatus("")
        setSubType("")
        setType("")
        setAvailability("")
        setEmphasis(false)
    }

    
    const emphasisFilter = data?.filter((companies) => companies.emphasis === emphasis)
    const statusFilter = data?.filter((companies) => companies.status === status || companies.status === "Aluguel e Venda")
    const availabilityFilter = data?.filter((companies) => companies.availability === availability)
    const availabilityStatusFilter = data?.filter((companies) => companies.availability === availability && companies.status === status || companies.status === "Aluguel e Venda")
    const availabilityStatusFilterType = data?.filter((companies) => companies.availability === availability && companies.status === status || companies.status === "Aluguel e Venda" && companies.type === type)
    const availabilityStatusFilterTypeSubtype = data?.filter((companies) => companies.availability === availability && companies.status === status || companies.status === "Aluguel e Venda" && companies.type === type && companies.subType === subType)
    const statusFilterTypeSubtype = data?.filter((companies) =>  companies.status === status || companies.status === "Aluguel e Venda" && companies.type === type && companies.subType === subType)
    const availabilityFilterTypeSubtype = data?.filter((companies) => companies.availability === availability && companies.type === type && companies.subType === subType)
    const statusFilterType = data?.filter((companies) =>  companies.status === status || companies.status === "Aluguel e Venda" && companies.type === type )
    const availabilityFilterType = data?.filter((companies) => companies.availability === availability && companies.type === type )
    const typeFilter = data?.filter((companies) => companies.type === type)
    const subTypeFilter = data?.filter((companies) => companies.type === type && companies.subType === subType)
    const searchFilter = data?.filter((companies) => companies.title.toLowerCase().includes(searchLower) || companies.id.toLowerCase().includes(searchLower))


    const filterData = search !== "" && status === "" && availability === "" && type === "" && subType === "" && emphasis === false ? searchFilter
                     : search === "" && status !== "" && availability === "" && type === "" && subType === "" && emphasis === false ? statusFilter 
                     : search === "" && status === "" && availability !== "" && type === "" && subType === "" && emphasis === false ? availabilityFilter 
                     : search === "" && status !== "" && availability !== "" && type === "" && subType === "" && emphasis === false ? availabilityStatusFilter 
                     : search === "" && status !== "" && availability !== "" && type !== "" && subType === "" && emphasis === false ? availabilityStatusFilterType 
                     : search === "" && status !== "" && availability !== "" && type !== "" && subType !== "" && emphasis === false ? availabilityStatusFilterTypeSubtype 
                     : search === "" && status !== "" && availability === "" && type !== "" && subType !== "" && emphasis === false ? statusFilterTypeSubtype 
                     : search === "" && status === "" && availability !== "" && type !== "" && subType !== "" && emphasis === false ? availabilityFilterTypeSubtype 
                     : search === "" && status !== "" && availability === "" && type !== "" && subType === "" && emphasis === false ? statusFilterType 
                     : search === "" && status === "" && availability !== "" && type !== "" && subType === "" && emphasis === false ? availabilityFilterType 
                     : search === "" && status === "" && availability === "" && type !== "" && subType === "" && emphasis === false ? typeFilter 
                     : search === "" && status === "" && availability === "" && type !== "" && subType !== "" && emphasis === false ? subTypeFilter 
                     : search === "" && status === "" && availability === "" && type === "" && subType === "" && emphasis === true ? emphasisFilter 
                     : data


    return (
        <div className="MyPropertiesList">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <div className="textHome">
                <h3>Meus autos</h3>

                <h4>{data?.length}
                {plains?.namePlain === undefined ? "/10 " :
                    plains?.namePlain === "Start" ? "/50 " :
                    plains?.namePlain === "Lite" ? "/200 " :
                    plains?.namePlain === "Tour" ? " " :

                    "" 
                 }
                  autos publicados
                 </h4>

                <h3><a className="link" href={plains?.namePlain === undefined && data?.length >= 10 ? "/atualizar-plano/Start" :
                    plains?.namePlain === "Start" && data?.length >= 50 ? "/atualizar-plano/Lite" :
                    plains?.namePlain === "Lite" && data?.length >= 200 ? "/atualizar-plano/Tour" :
                    plains?.namePlain === "Tour" ? "/novoauto" :
                    "/novoauto"
                 }>+ Novo anúncio</a></h3>
                </div>
              

                <div className="search">
                    <input type="text" placeholder="Busque por: Título, código ou cidade" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClear}/>
                    <div className="selection">
                    <select value={status} onChange={handleStatus}>
                        <option value="">Status</option>
                        <option value="Venda">Venda</option>
                        <option value="Aluguel">Aluguel</option>
                    </select>
                    <select value={availability} onChange={handleAvailability}>
                        <option value="">Visualização</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Alugado">Alugado</option>
                        <option value="Vendido">Vendido</option>
                        <option value="Indisponível">Indisponível</option>
                    </select>
                    <select value={emphasis} onChange={handleEmphasis}>
                        <option value={false}>Sem destaque</option>
                        <option value={true}>Com destaque</option>
                    </select>
                    <select value={type} onChange={handleType}>
                        <option value="">Tipo</option>
                        <option value="Residencial">Residencial</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Rural">Rural</option>
                        <option value="Terrenos e Lotes">Terrenos e Lotes</option>
                    </select>
                    <select value={subType} onChange={handleSubType}>
                        {type === "Residencial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Casa">Casa</option>
                        <option value="Casa geminada">Casa geminada</option>
                        <option value="Sobrado">Sobrado</option>
                        <option value="Bangalô">Bangalô</option>
                        <option value="Edícula">Edícula</option>
                        <option value="Flat">Flat</option>
                        <option value="Casa de vila">Casa de vila</option>
                        <option value="Condomínio fechado">Condomínio fechado</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Apartamento duplex">Apartamento duplex</option>
                        <option value="Cobertura">Cobertura</option>
                        <option value="Cobertura duplex">Cobertura duplex</option>
                        <option value="Loft">Loft</option>
                        <option value="Kitnet">Kitnet</option>
                        <option value="Mansão">Mansão</option>
                        <option value="Stúdio">Stúdio</option>
                        </>
                        : type === "Comercial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Loja">Loja</option>
                        <option value="Conjunto comercial">Conjunto comercial</option>
                        <option value="Ponto comercial">Ponto comercial</option>
                        <option value="Sala Comercial">Sala Comercial</option>
                        <option value="Prédio">Prédio</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Stúdio">Stúdio</option>
                        </>
                        : type === "Industrial" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Galpão">Galpão</option>
                        <option value="Área industrial">Área industrial</option>
                        </>
                        : type === "Rural" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Chácara">Chácara</option>
                        <option value="Fazenda">Fazenda</option>
                        <option value="Sítio">Sítio</option>
                        </>
                        : type === "Terrenos e Lotes" ?
                        <>
                        <option value="">Subtipo</option>
                        <option value="Área">Área</option>
                        <option value="Terreno/Lote">Terreno/Lote</option>
                        </>
                        :  <option value="">Subtipo</option>
                        }
                    </select>
                    </div>
                </div>
            <div className="informations">

                {filterData?.map((property) => {
                    return (
                        <div className="propertyListAdm" key={property.id}>
                        <div className="image">
                            <a href="/conversa">
                            <img src={property.featuredImage} alt="" />
                            </a>
                        </div>
                        <div className="textpropertyListAdm">
                            <div className="textDatapropertyListAdm">
                        <h4>{property.title} - {property.id}</h4>
                        <h5><IoHomeOutline />{property.type} - {property.subType} - {property.status}</h5>
                        <h5><IoLocationOutline />{property.road} - {property.district} - {property.city} -{property.uf}</h5>
                        <h6><DateFormat2 date={property.created_at} /></h6>
                            </div>
                            <div className="propertyView">
                            <h4 className="emphasis">Destaque: {property.emphasis === false ?  "Não ": "Sim"}</h4>
                            <h4 className={
                                property.availability === "Disponível" ? "status1" :
                                property.availability === "Vendido" ? "status2" :
                                property.availability === "Alugado" ? "status3" : "status4"
                            }>{property.availability}</h4>

                                <EditStatusProperty id={property.id}/>


                            </div>
                        <div className="infosContactData">
                            <div className="infoUnicData">
                            <IoEyeOutline />
                                <h6> <CountersViews id={property.id}/> Visualizações</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoHeartOutline />
                                <h6> <CountersFavorites id={property.id}/> Salvos</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoLogoWhatsapp />
                                <h6> <CountersWhatsapp id={property.id}/> Whatsapp</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoCallOutline />
                                <h6><CountersContact id={property.id}/> Ligações</h6>
                            </div>

                             <MatchProperty id={property.id}/>

                            <MatchPropertySearch  status={property.status} type={property.type} subType={property.subType}
                             uf={property.uf} city={property.city} district={property.district} 
                             bedroom={property.bedroom} restroom={property.restroom} garage={property.garage}
                             suite={property.suite} pets={property.pets} furnished={property.furnished}/>

                        
                        </div>
                        </div>
    
               
                        <div className="buttons">

                        <ViewPropertyList id={property.id}/>

                        <a href={`/editarimovel/${property.id}`} className="btnControl" data-tip data-for='Editar'><IoCreateOutline /></a>
    
                        <DeleteProperty id={property.id} title={property.title}
                                            address={`${property.road}, ${property.number} - ${property.district} - ${property.city} - ${property.uf}`}
                                            status={`${property.type} - ${property.subType}`}/>
    
  
                        {/* <NewNegotiations idProperty={property.id}/> */}
    
                        </div>
                    </div>  
                    )
                })}


            </div>
            </div>



        </div>
    )
}