import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./myAppointments.css";
import {IoCheckmarkOutline, IoCalendarOutline, IoCloseOutline, IoPersonOutline, IoCarOutline, IoHomeO, IoCheckmarkOutlineutline, IoHomeOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../hooks/useFetch";
import { SchedulingEdit } from "../../components/SchedulingEdit/SchedulingEdit";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";

export function MyAppointments() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);

    const {updateStatusSchedule} = useContext(AuthContext);

    const [status, setStatus] = useState("")
    const [periods, setPeriods] = useState("")
    const [shifts, setShifts] = useState("")

    const [search, setSearch] = useState("");
    const searchLower = search.toLowerCase();

    const {data} = useFetch(`/scheduling/company/${user.id}`);

    if(!data) {
        return (
            <h5>Carregando...</h5>
        )
    }

    function handleUpdateStatus(id, status, email) {
        updateStatusSchedule({id, status, email});
        console.log({id, status, email});
    }

    function handleStatus(e) {
        setStatus(e.target.value);
        setShifts("");
        setPeriods("");
        setSearch("")
    }
    function handlePeriods(e) {
        setPeriods(e.target.value);
        setShifts("");
        setStatus("");
        setSearch("")
    }
    function handleShifts(e) {
        setShifts(e.target.value);
        setStatus("");
        setPeriods("");
        setSearch("")
    }

    function handleClear() {
        setShifts("");
        setStatus("");
        setPeriods("");
    }


    const filterNow = data?.filter((filterData) => new Date(filterData.created_at).getDate() === new Date().getDate()
                                                && new Date(filterData.created_at).getMonth()+1  === new Date().getMonth()+1
                                                && new Date(filterData.created_at).getFullYear() === new Date().getFullYear())
    const filterNext = data?.filter((filterData) => new Date(filterData.created_at) > new Date())
    const filterPassed = data?.filter((filterData) => new Date(filterData.created_at) < new Date());
    const filterStatus = data?.filter((filterData) => filterData.status === status);
    const filterShifts = data?.filter((filterData) => filterData.shift === shifts);
    const searchFilter = data?.filter((companies) => companies.titleProperty.toLowerCase().includes(searchLower) || companies.nameClient.toLowerCase().includes(searchLower))

    
    const filterData = search !== "" && status === "" && periods === "" && shifts === ""  ? searchFilter
                     : search === "" && status !== "" && periods === "" && shifts === ""  ? filterStatus 
                     : search === "" && status === "" && periods === "Hoje" && shifts === "" ? filterNow  
                     : search === "" && status === "" && periods === "Próximos" && shifts === "" ? filterNext  
                     : search === "" && status === "" && periods === "Passados" && shifts === "" ? filterPassed  
                     : search === "" && status === "" && periods === "" && shifts !== "" ? filterShifts  
                     : data


    return (
        <div className="MyAppointments">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <div className="textHome">
            <h3>Meus Agendamentos</h3>
                {/* <a className="link" href="/novoimovel">+ Nova venda</a> */}
                </div>
               


                <div className="search">
                <input type="text" placeholder="Busque por: Título, código ou cidade" value={search} onChange={e => setSearch(e.target.value)} onClick={handleClear}/>
                    <div className="selection">
                    <select value={status} onChange={handleStatus} >
                        <option value="">Status</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                    <select value={periods} onChange={handlePeriods}>
                        <option value="">Períodos</option>
                        <option value="Hoje">Hoje</option>
                        <option value="Próximos">Próximos</option>
                        <option value="Passados">Passados</option>
                    </select>
                    <select value={shifts} onChange={handleShifts}>
                        <option value="">Turnos</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                    </select>
                    </div>
                </div>


            <div className="informations">
                {filterData?.map((scheduling) => {
                    return (
                        <div className="AppointmentsListAdm">
                        <div className="image">
                            <a  href={`/agendamento/${scheduling.id}`} >
                            <img src={scheduling.imageProperty} alt="" />
                            </a>
                        </div>
                        <div className="textAppointmentsListAdm">
                            <div className="textDataAppointmentsListAdm">
                            <a  href={`/agendamento/${scheduling.id}`} >
                        <h4>{scheduling.titleProperty} | {scheduling.type}</h4>
                            </a>
                        <h5>Cliente: {scheduling.nameClient}</h5>
                        <h6><IoCalendarOutline /> {scheduling.day} /{scheduling.month}/{scheduling.year}  {scheduling.hour}  | {scheduling.shift} </h6>
                            </div>
                            <div className="user">
                            <h5 className={scheduling.status === "Aprovado" ? "aproved"
                                            : scheduling.status === "Pendente" ? "pending"
                                            : scheduling.status === "Cancelado" ? "cancel"
                                            : scheduling.status === "Concluido" ? "conclused"
                                            : ""
                                        }>{scheduling.status}</h5>
                            </div>
                        <div className="infosContactData">
                            <div className="infoUnicData">
                            <IoPersonOutline />
                                <h6>{scheduling.amountOfPeople} Pessoas</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoCarOutline />
                                <h6> Possui carro? {scheduling.ownACar}</h6>
                            </div>
                            <div className="infoUnicData">
                            <IoHomeOutline />
                                <h6> Deseja ver outros imóveis? {scheduling.similarProperties}</h6>
                            </div>
                        </div>
                        </div>
    
    
    
    
                        <div className="buttons">
                        <SchedulingEdit id={scheduling.id} email={scheduling.email}/>

                        <button className="btnControl" data-tip data-for='Cancelar' onClick={() => handleUpdateStatus(scheduling.id, "Cancelado", scheduling.email)}><IoCloseOutline /></button>
                        <ReactTooltip id='Cancelar' place="bottom" type="dark" effect="solid">
                         <span>Cancelar</span>
                        </ReactTooltip>

                        <button className="btnControl" data-tip data-for='Aprovar' onClick={() => handleUpdateStatus(scheduling.id, "Aprovado", scheduling.email)}><IoCheckmarkOutline /></button>
                        <ReactTooltip id='Aprovar' place="bottom" type="dark" effect="solid">
                         <span>Aprovar</span>
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







