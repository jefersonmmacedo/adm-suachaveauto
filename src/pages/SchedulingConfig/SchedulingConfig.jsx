import { MiniMenu } from "../../components/MiniMenu/MiniMenu";
import NavbarAdm from "../../components/Nav/Navbar"
import { ToolBar } from "../../components/ToolBar/ToolBar"
import "./schedulingConfig.css"
import { useState } from "react";

export function SchedulingConfig() {
    const Local = localStorage.getItem("adm-suachave");
    const user = JSON.parse(Local);
   
    const [day, setDay] = useState("")
    const [activeDay, setActiveDay] = useState(false)
    const [shift, setShift] = useState("")
    const [schedules, setSchedules] = useState("")

    let data = {
        idCompany: user.id,
        Sunday: {
          Active: false,
          Shifts: [
            {Turno: "Manhã"},
            {Turno: "Tarde"},
           ],
             Schedules: [
             {
             Turno: "Manhã",
             Horário: "08:00 - 09:00"
           },
                   {
             Turno: "Manhã",
             Horário: "09:00 - 10:00"
           },
                   {
             Turno: "Manhã",
             Horário: "10:00 - 11:00"
           },
                   {
             Turno: "Manhã",
             Horário: "11:00 - 12:00"
           },
                   {
             Turno: "Tarde",
             Horário: "13:00 - 14:00"
           },
                   {
             Turno: "Tarde",
             Horário: "14:00 - 15:00"
           },
                   {
             Turno: "Tarde",
             Horário: "15:00 - 16:00"
           },
                   {
             Turno: "Tarde",
             Horário: "16:00 - 17:00"
           }
         ]},
        Monday: {
            Active: true,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
         Tuesday: {
            Active: true,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
         Wednesday: {
            Active: true,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
         Thursday: {
            Active: true,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
         Friday: {
            Active: true,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
         Saturday: {
            Active: false,
            Shifts: [
                {Turno: "Manhã"},
                {Turno: "Tarde"},
               ],
                 Schedules: [
                 {
                 Turno: "Manhã",
                 Horário: "08:00 - 09:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "09:00 - 10:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "10:00 - 11:00"
               },
                       {
                 Turno: "Manhã",
                 Horário: "11:00 - 12:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "13:00 - 14:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "14:00 - 15:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "15:00 - 16:00"
               },
                       {
                 Turno: "Tarde",
                 Horário: "16:00 - 17:00"
               }
             ]},
        }

        function handleDay(e) {
            setDay(e.target.value)
            console.log(e.target.value)
        }

        function handleActiveDay(e) {
          if(e.target.value === "true") {
            setActiveDay(true)
          }  else {
            setActiveDay(false)
          }
            console.log(e.target.value)
        }

        function handleShift(e) {
            setShift(e.target.value)
            console.log(e.target.value)
        }

        function handleSchedules(e) {
            setSchedules(e.target.value)
            console.log(e.target.value)
        }

        function updateInformationDays(data) {
            console.log(data)
            const reference = `data.${day}`
            console.log(reference)
             if(data === "Horário") {
                reference.Schedules.push(
                    {
                        Turno: shift,
                        Horário: schedules
                      }
                )
            } else if (data === "Turno") {
                // reference.Shift.push(
                //     {
                //         Turno: shift,
                //       }
                // )

                data.Sunday.Shifts.push(
                      {
                        Turno: "Noite",
                      }
                )
            } else if (data === "Dia") {
                reference.Active.push(activeDay)
            }


        }


      

    return (
        <div className="SchedulingConfig">
            <NavbarAdm />
            <ToolBar />
            <div className="aside">
            <MiniMenu />
            <div className="informations">
                <h3>Seus horários</h3>
                <div className="SchedulingsInfos">
                    <div className="infos">
                        <h4>Domingo</h4>
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>                                    
                             </div>
                             <div className="infoList">
                            {data.Sunday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Sunday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                                     
                             </div>
                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>    
                    </div>
                             <div className="infoList"> 
                        {data.Sunday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Sunday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>  
                    <div className="infos">
                        <h4>Segunda-Feira</h4>
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>       
                             </div>
                             <div className="infoList">
                            {data.Monday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Monday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                                     
                             </div>
                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>     
                    </div>
                             <div className="infoList"> 
                        {data.Monday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Monday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>
                    <div className="infos">
                        <h4>Terça-Feira</h4>
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>     
                             </div>
                             <div className="infoList">
                            {data.Tuesday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Tuesday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                                     
                             </div>
                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>    
                    </div>
                             <div className="infoList"> 
                        {data.Tuesday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Tuesday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>
                    <div className="infos">
                        <h4>Quarta-Feira</h4>
                             <div className="infoList">
                                <h5><b>Turnos:</b></h5>  
                             </div>
                             <div className="infoList">
                                {data.Wednesday.Active === false ? 
                                <h5>Sem turnos disponíveis</h5>
                                : 
                                data.Wednesday.Shifts.map((shifts) => {
                                    return (
                                        <div className="listUnicShift">
                                            <h6>{shifts.Turno}</h6>
                                            {/* <input type="checkbox" name="" id="" /> */}
                                            <button>X</button>
                                   </div>
                                    )
                                })}   
                             </div>

                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>    
                    </div>
                             <div className="infoList"> 
                        {data.Wednesday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Wednesday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>
                    <div className="infos">
                        <h4>Quinta-Feira</h4>
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>     
                             </div>
                             <div className="infoList">
                            {data.Thursday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Thursday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                                     
                             </div>
                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>    
                    </div>
                             <div className="infoList"> 
                        {data.Thursday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Thursday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>
                    <div className="infos">
                        <h4>Sexta-Feira</h4>
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>      
                             </div>
                             <div className="infoList">
                            {data.Friday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Friday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                                     
                             </div>
                             <div className="infoList"> 
                        <h5><b>Horários:</b></h5>    
                    </div>
                             <div className="infoList"> 
                        {data.Friday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Friday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>
                    <div className="infos">
                        <h4>Sábado</h4>
                        <div className="infoList">
                             <div className="infoList">
                            <h5><b>Turnos:</b></h5>
                        </div>
                             <div className="infoList">
                            {data.Saturday.Active === false ? 
                            <h5>Sem turnos disponíveis</h5>
                             : 
                            data.Saturday.Shifts.map((shifts) => {
                                return (
                                    <div className="listUnicShift">
                                        <h6>{shifts.Turno}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}
                        </div>
                             </div>
                        <div className="infoList">       
                        <h5><b>Horários:</b></h5>     
                    </div>
                        <div className="infoList">  
                        {data.Saturday.Active === false ? 
                            <h5>Sem horários disponíveis</h5>
                             : 
                            data.Saturday.Schedules.map((shifts) => {
                                return (
                                   <div className="listUnic">
                                       <h6>{shifts.Horário}</h6>
                                        {/* <input type="checkbox" name="" id="" /> */}
                                        <button>X</button>
                                   </div>
                                )
                            })}     
                    </div>
                    </div>

                </div>


                <h3>Configure sua agenda</h3>

                <div className="Schedulings">

                <div className="day">
                    <div className="service">
                        <h5>Configuração de agenda disponível em breve.</h5>
                        {/* <h5>Atualizar dia de atendimento</h5>
                        <select select value={day} onChange={handleDay}>
                            <option value="">Selecione o dia</option>
                            <option value="Sunday">Domingo</option>
                            <option value="Monday">Segunda</option>
                            <option value="Tuesday">Terça</option>
                            <option value="Wednesday">Quarta</option>
                            <option value="Thursday">Quinta</option>
                            <option value="Friday">Sexta</option>
                            <option value="Saturday">Sábado</option>
                        </select>
                        <select select value={activeDay} onChange={handleActiveDay}>
                            <option value="">Atende neste dia?</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                        <button onClick={() => updateInformationDays("Dia")}>Atualizar dia</button> */}
                    </div>
                    {/* <div className="service">
                    <h5>Adicione turno:</h5>
                    <select select value={day} onChange={handleDay}>
                            <option value="">Selecione o dia</option>
                            <option value="Sunday">Domingo</option>
                            <option value="Monday">Segunda</option>
                            <option value="Tuesday">Terça</option>
                            <option value="Wednesday">Quarta</option>
                            <option value="Thursday">Quinta</option>
                            <option value="Friday">Sexta</option>
                            <option value="Saturday">Sábado</option>
                        </select>    
                    <select value={shift} onChange={handleShift}>
                            <option value="">Selecione o Turno</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        <button onClick={() => updateInformationDays("Turno")}>Adicionar Turno</button>
  
                    </div>
                    <div className="service">
                    <h5>Adicione horário:</h5> 
                    <select value={day} onChange={handleDay}>
                            <option value="">Selecione o dia</option>
                            <option value="Sunday">Domingo</option>
                            <option value="Monday">Segunda</option>
                            <option value="Tuesday">Terça</option>
                            <option value="Wednesday">Quarta</option>
                            <option value="Thursday">Quinta</option>
                            <option value="Friday">Sexta</option>
                            <option value="Saturday">Sábado</option>
                        </select>
                    <select value={shift} onChange={handleShift}>
                            <option value="">Selecione o Turno</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        <select value={schedules} onChange={handleSchedules}>
                            <option value="">Selecione o Horário</option>
                            <option value="08h - 09h">08h - 09h</option>
                            <option value="09h - 10h">09h - 10h</option>
                            <option value="10h - 11h">10h - 11h</option>
                            <option value="11h - 12h">11h - 12h</option>
                            <option value="12h - 13h">12h - 13h</option>
                            <option value="13h - 14h">13h - 14h</option>
                            <option value="14h - 15h">14h - 15h</option>
                            <option value="15h - 16h">15h - 16h</option>
                            <option value="16h - 17h">16h - 17h</option>
                            <option value="17h - 18h">17h - 18h</option>
                            <option value="18h - 19h">18h - 19h</option>
                            <option value="19h - 20h">19h - 20h</option>
                            <option value="20h - 21h">20h - 21h</option>
                        </select>

                        <button onClick={() => updateInformationDays("Horário")}>Adicionar Horário</button>
  
                    </div> */}
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}


