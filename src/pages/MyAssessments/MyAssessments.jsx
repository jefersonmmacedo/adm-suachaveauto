import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myAssessments.css";
import {IoFileTrayFullOutline, IoTrashOutline, IoLocationOutline, IoCalendarOutline, IoAddOutline, IoAddCircle, IoAddCircleOutline} from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../hooks/useFetch";
import { DateFormat2 } from "../../components/DateFormat2/DateFormat2";
import { NewScheduling } from "../../components/NewScheduling/NewScheduling";

export function MyAssessments() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {data} = useFetch(`/evaluation/company/${user.id}`);

    if(data) {
       console.log(data);
    }
    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    return (
        <div className="MyAssessments">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
                <div className="textHome">
                <h3>Imóveis à avaliar</h3>
                {/* <a className="link" href="/novoimovel">+ Nova venda</a> */}
                </div>
      

                <div className="search">
                    <input type="text" placeholder="Busque por: Título, código ou cidade" />
                    <div className="selection">
                    <select>
                        <option value="">Venda</option>
                        <option value="">Aluguel</option>
                        <option value="">Temporada</option>
                    </select>

                    <select>
                        <option value="">Tipo</option>
                        <option value="">Residencial</option>
                        <option value="">Comercial</option>
                    </select>
                    <select>
                        <option value="">Subtipo</option>
                        <option value="">Casa</option>
                        <option value="">Apartamento</option>
                    </select>
                    </div>
                </div>
            <div className="informations">

                {data.map((Assessments) => {
                    return (
                        <div className="AssessmentsListAdm" key={Assessments.id}>
                        <div className="image">
                            <a href="/conversa">
                            <img src={Assessments.featuredImage} alt="" />
                            </a>
                        </div>
                        <div className="textAssessmentsListAdm">
                            <div className="textDataAssessmentsListAdm">
                        <h4>{Assessments.title}</h4>
                        <h5><IoLocationOutline />{Assessments.road} - {Assessments.district} - {Assessments.city} - {Assessments.uf}</h5>
                        <h6><DateFormat2 date={Assessments.created_at} /></h6>
                            </div>
                            <div className="user">
                            <h5 className="aproved">{Assessments.status}</h5>
                            </div>
                        </div>
    
   
                        <div className="buttons">
                        <NewScheduling idEvaluation={Assessments.id} image={Assessments.featuredImage} title={Assessments.title}
                        email={Assessments.email} phone={Assessments.phone} whatsapp={Assessments.whatsapp} name={Assessments.name}
                        address={`${Assessments.road} - ${Assessments.district} - ${Assessments.city} - ${Assessments.uf}`}/>

                        <button className="btnControl" data-tip data-for='Criar Novo Imóvel'><IoAddCircleOutline /></button>
                        <ReactTooltip id='Criar Novo Imóvel' place="bottom" type="dark" effect="solid">
                         <span>Criar Novo Imóvel</span>
                        </ReactTooltip>
    
                        <button className="btnControl" data-tip data-for='Deletar'><IoTrashOutline /></button>
                        <ReactTooltip id='Deletar' place="bottom" type="dark" effect="solid">
                         <span>Deletar</span>
                        </ReactTooltip>
    

    
                        </div>
                    </div>  
                    )
                })}


            </div>
            </div>
        </div>
    )
}