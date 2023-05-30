import "./equipeAdm.css"
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import { IoTrashOutline, IoLocationOutline, IoCallOutline, IoMailOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../hooks/useFetch";
import { FilterDataEquipe } from "../../components/FilterDataEquipe/FilterDataEquipe";
import { NewCollaborator } from "../../components/NewCollaborator/NewCollaborator";
import { NewEditCollaborator } from "../../components/NewEditCollaborator/NewEditCollaborator";
import { MiniMenu } from "../../components/MiniMenu/MiniMenu";

export function EquipeAdm() {

    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);


    const {data} = useFetch(`/clientCompany/company/${user.id}`);

    if(data) {
        console.log(data)
    }
    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    return (
        <div className="EquipeAdm">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <MiniMenu />
            <div className="textHome">
                <h3>Equipe</h3>
                <NewCollaborator />
                </div>
                <div className="search">
                    <input type="text" placeholder="Busque por: Título, código ou cidade" />
                    <div className="selection">
                    <select>
                        <option value="">Função</option>
                        <option value="Advogado(a)">Advogado(a)</option>
                            <option value="Corretor(a)">Corretor(a)</option>
                            <option value="Atendente">Atendente</option>
                            <option value="Secretária(o)">Secretária(o)</option>
                            <option value="Vendedor(a)">Vendedor(a)</option>
                            <option value="Designer">Designer</option>
                            <option value="Programador(a)">Programador(a)</option>
                            <option value="Diretor(a)">Diretor(a)</option>
                            <option value="Gerente">Gerente</option>
                            <option value="Supervisor(a)">Supervisor(a)</option>
                            <option value="CEO">CEO</option>
                    </select>
                    <select>
                        <option value="">Contrato</option>
                        <option value="">Em vigor</option>
                        <option value="">Pausado</option>
                        <option value="">Cancelado</option>
                    </select>
                    <select>
                        <option value="">Sexo</option>
                        <option value="">Masculino</option>
                        <option value="">Feminino</option>
                    </select>
                    </div>
                </div>
            <div className="informationsEquipe">
            {data.map((equipe) => {
                    return (
                        <div className="EquipeListAdm" key={equipe.id}>
                        <div className="image">
                            <a href="/conversa">
                            <img src={equipe.avatar} alt="" />
                            </a>
                        </div>
                        <div className="textEquipeListAdm">
                            <div className="textDataEquipeListAdm">
                        <h4>{equipe.fantasyName}</h4>
                        <h6><IoLocationOutline /> {equipe.road} - Nº{equipe.number} - {equipe.district} -{equipe.city} -{equipe.uf} </h6>
                        <h6><IoCallOutline /> {equipe.phone} <IoCallOutline /> {equipe.whatsapp} <IoMailOutline /> jefersonmacedowgf@gmail.com</h6>
                            </div>
                            <h5>{equipe.interest} - {equipe.type} - {equipe.subtype} - {equipe.cityPreference} - {equipe.ufPreference}</h5>
                        </div>
   
                        <div className="buttonsEquipes">
                       <NewEditCollaborator />
    
                        <button className="btnControl" data-tip data-for='Deletar'><IoTrashOutline /></button>
                        <ReactTooltip id='Deletar' place="bottom" type="dark" effect="solid">
                         <span>Deletar</span>
                        </ReactTooltip>
                        
                        <FilterDataEquipe name={equipe.fantasyName} address={`${equipe.road} - Nº${equipe.number} - ${equipe.district} -${equipe.city} -${equipe.uf}`} phone={equipe.phone} whatsapp={equipe.whatsapp} email={equipe.email} interess={`${equipe.interest} - ${equipe.type} - ${equipe.subtype} - ${equipe.cityPreference} - ${equipe.ufPreference}`}/>
   
                        </div>
                    </div>  
                    )
                })}
            </div>
            </div>
        </div>
    )
}