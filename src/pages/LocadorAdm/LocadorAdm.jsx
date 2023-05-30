


import "./locadorAdm.css"
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import {IoTrashOutline, IoLocationOutline, IoCallOutline, IoMailOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../hooks/useFetch";
import { FilterDataEquipe } from "../../components/FilterDataEquipe/FilterDataEquipe";
import { NewEditCollaborator } from "../../components/NewEditCollaborator/NewEditCollaborator";
import { NewLocador } from "../../components/NewLocador/NewLocador";
import { useState } from "react";
import { EditLocador } from "../../components/EditLocador/EditLocador";
import { DeleteClient } from "../../components/DeleteClient/DeleteClient";
import { MiniMenuAccounts } from "../../components/MiniMenuAccounts/MiniMenuAccounts";
import { DeleteLocator } from "../../components/DeleteLocator/DeleteLocator";

export function LocadorAdm() {

    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();



    const {data} = useFetch(`/locator/company/${user.id}`);

    if(data) {
        console.log(data)
    }
    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    var cityList = [];
    var ufList = [];

    data?.forEach((item) => {
        var duplicated  = cityList.findIndex(redItem => {
            return item.city === redItem.city;
        }) > -1;
    
        if(!duplicated) {
            cityList.push(item);
        }
    });
    data?.forEach((item) => {
        var duplicated  = ufList.findIndex(redItem => {
            return item.uf === redItem.uf;
        }) > -1;
    
        if(!duplicated) {
            ufList.push(item);
        }
    });


    if(cityList) {
        cityList.sort(function(a,b) {
            if(a.uf < b.uf ) {
                return -1
            } else {
                return true
            }
        })
        }
    if(ufList) {
        ufList.sort(function(a,b) {
            if(a.uf < b.uf ) {
                return -1
            } else {
                return true
            }
        })
        }


        function handleCity(e) {
            setCity(e.target.value)
            console.log(e.target.value)
        }

        function handleUf(e) {
            setUf(e.target.value)
            console.log(e.target.value)
        }

        function handleClear() {
            setCity("")
            setUf("")
        }
    

    const cityFilter = data?.filter((companies) => companies.city === city)
    const ufFilter = data?.filter((companies) => companies.uf === uf)
    const cityUfFilter = data?.filter((companies) => companies.city === city && companies.uf === uf)
    const searchFilter = data?.filter((companies) => companies.name.toLowerCase().includes(searchLower) || companies.fantasyName.toLowerCase().includes(searchLower))

    const filterData = search !== "" && city === "" && uf === "" ? searchFilter
                     : search === "" && city !== "" && uf === ""  ? cityFilter 
                     : search === "" && city === "" && uf !== ""  ? ufFilter 
                     : search === "" && city !== "" && uf !== ""  ? cityUfFilter 
                     
                     : data


    return (
        <div className="LocadorAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">                
                <MiniMenuAccounts />

            <div className="textHome">
                <h3>Proprietários</h3>
                <NewLocador />
                </div>

                <div className="search">
                    <input type="text" placeholder="Busque por: Nome, nome fantasia ou razão social" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClear}/>
                    <div className="selection">

                    <select value={uf} onChange={handleUf}>
                        <option value="">Estado(UF)</option>
                        {ufList?.map((address) => {
                            return (
                                <option value={address.uf}>{address.uf}</option>
                            )
                        })}
                    </select>
                    
                    <select value={city} onChange={handleCity}>
                        <option value="">Cidade</option>
                        {cityList?.map((address) => {
                            return (
                                <option value={address.city}>{address.city}</option>
                            )
                        })}
                    </select>

                    </div>
                </div>


            <div className="informationsEquipe">
            {filterData?.map((client) => {
                    return (
                        <div className="EquipeListAdm" key={client.id}>
                        <div className="textEquipeListAdm">
                            <div className="textDataEquipeListAdm">
                        <h4>{client.name} - {client.fantasyName }</h4>
                        <h6><IoLocationOutline /> {client.road} - Nº{client.number} - {client.district} -{client.city} -{client.uf} </h6>
                        <h6><IoCallOutline /> {client.phone} <IoCallOutline /> {client.whatsapp} </h6>
                        <h6><IoMailOutline /> {client.email}</h6>
                            </div>
                            <h5>Imóveis registrados: x</h5>
                        </div>
   
                        <div className="buttonsEquipes">
                       <EditLocador idLocator={client.id}/>
    
                       <DeleteLocator id={client.id} name={client.name} fantasyName={client.fantasyName} cpfCnpj={client.cpf_Cnpj}
                        address={`${client.city} - ${client.uf}`} typeLocator="Proprietário"/>
                        
                        <FilterDataEquipe name={client.fantasyName} address={`${client.road} - Nº${client.number} - ${client.district} -${client.city} -${client.uf}`} phone={client.phone} whatsapp={client.whatsapp} email={client.email} interess={`${client.interest} - ${client.type} - ${client.subtype} - ${client.cityPreference} - ${client.ufPreference}`}/>
   
                        </div>
                    </div>  
                    )
                })}
            </div>
            </div>
        </div>
    )
}