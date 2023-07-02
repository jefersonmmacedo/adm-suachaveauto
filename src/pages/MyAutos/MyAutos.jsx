import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myAutos.css";
import { IoCreateOutline, IoLocationOutline, IoEyeOutline, IoHeartOutline, IoLogoWhatsapp, IoCallOutline, IoHomeOutline, IoInfiniteOutline, IoCarOutline} from 'react-icons/io5';
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { EditStatusAuto } from "../../components/EditStatusAuto/EditStatusAuto";
import { CountersViews } from "../../components/CountersProperties/CountersViews";
import { CountersFavorites } from "../../components/CountersProperties/CountersFavorites";
import { CountersContact } from "../../components/CountersProperties/CountersContact";
import { CountersWhatsapp } from "../../components/CountersProperties/CountersWhatsapp";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { DeleteAuto } from "../../components/DeleteAuto/DeleteAuto";
import { ViewAutoList } from "../../components/ViewAutoList/ViewAutoList";
import { MatchAuto } from "../../components/MatchAuto/MatchAuto";
import { MatchAutoSearch } from "../../components/MatchAutoSearch/MatchAutoSearch";

export function MyAutos() {
    const Local = localStorage.getItem("adm-suachaveauto");
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

    const {data} = useFetch(`/autos/company/${user.id}`);

    if(data) {
        console.log(data)
    }
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
    const searchFilter = data?.filter((companies) => companies.brand.toLowerCase().includes(searchLower)
                                    || companies.model.toLowerCase().includes(searchLower)
                                    || companies.version.toLowerCase().includes(searchLower)
                                    || companies.plate.toLowerCase().includes(searchLower)
                                    || companies.year.toLowerCase().includes(searchLower)
                                    || companies.yearModel.toLowerCase().includes(searchLower)
                                    || companies.id.toLowerCase().includes(searchLower))


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
        <div className="MyAutos">
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
                    <input type="text" placeholder="Busque: ID, Marca, Modelo, Versão, Placa ou Ano" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClear}/>
                    <div className="selection">
                    <select value={status} onChange={handleStatus}>
                        <option value="">Tipo</option>
                        <option value="Carros">Carros</option>
                        <option value="Motos">Motos</option>
                    </select>
                    <select value={availability} onChange={handleAvailability}>
                        <option value="">Visualização</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Vendido">Vendido</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Indisponível">Indisponível</option>
                    </select>
                    <select value={emphasis} onChange={handleEmphasis}>
                        <option value={false}>Sem destaque</option>
                        <option value={true}>Com destaque</option>
                    </select>
                    </div>
                </div>
            <div className="informations">

                {filterData?.map((auto) => {
                    return (
                        <div className="AutoListAdm" key={auto.id}>
                        <div className="image">
                            <a href="/conversa">
                            <img src={auto?.featuredImage} alt="" />
                            </a>
                        </div>
                        <div className="textAutoListAdm">
                            <div className="textDataAutoListAdm">
                        <h4>{auto?.brand} - {auto?.model}  | ID: {auto?.id}</h4>
                        <h5><IoCarOutline />{auto?.version} - {auto?.year}/{auto?.yearModel} - Placa: {auto?.plate}</h5>
                        <h5><IoLocationOutline />{auto?.city} - {auto?.uf} | {auto?.fuel}</h5>
                        <h6>Cadastrado em <DateFormat2 date={auto?.created_at} /></h6>
                            </div>
                            <div className="AutoView">
                            <h4 className="emphasis">Destaque: {auto?.emphasis === false ?  "Não ": "Sim"}</h4>
                            <h4 className={
                                auto?.availability === "Disponível" ? "status1" :
                                auto?.availability === "Vendido" ? "status2" :
                                auto?.availability === "Alugado" ? "status3" : "status4"
                            }>{auto?.availability}</h4>

                                <EditStatusAuto id={auto?.id}/>


                            </div>
                        <div className="infosContactData">
                            <div className="infoUnicData">
                            <IoEyeOutline />
                                <h6> <CountersViews id={auto?.id}/> Visualizações</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoHeartOutline />
                                <h6> <CountersFavorites id={auto?.id}/> Salvos</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoLogoWhatsapp />
                                <h6> <CountersWhatsapp id={auto?.id}/> Whatsapp</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoCallOutline />
                                <h6><CountersContact id={auto?.id}/> Ligações</h6>
                            </div>

                             <MatchAuto id={auto?.id}/>

                            <MatchAutoSearch  status={auto?.status} type={auto?.type} subType={auto?.subType}
                             uf={auto?.uf} city={auto?.city} district={auto?.district} 
                             bedroom={auto?.bedroom} restroom={auto?.restroom} garage={auto?.garage}
                             suite={auto?.suite} pets={auto?.pets} furnished={auto?.furnished}/>

                        
                        </div>
                        </div>
    
               
                        <div className="buttons">

                        <ViewAutoList id={auto?.id}/>

                        <a href={`/editarimovel/${auto?.id}`} className="btnControl" data-tip data-for='Editar'><IoCreateOutline /></a>
    
                        <DeleteAuto id={auto?.id} brand={`${auto?.brand}`} model={`${auto?.model}`} version={`${auto?.version}`}
                                        plate={`${auto?.plate}`} year={`${auto?.year}/${auto?.yearModel}`}
                                            address={`${auto?.city} - ${auto?.uf}`}
                                            />
    
  
                        {/* <NewNegotiations idAuto={auto.id}/> */}
    
                        </div>
                    </div>  
                    )
                })}


            </div>
            </div>



        </div>
    )
}