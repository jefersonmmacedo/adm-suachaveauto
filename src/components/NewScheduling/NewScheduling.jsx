import "./newScheduling.css"
import { IoCalendar, IoCloseOutline, IoLocationOutline, IoBusinessOutline, IoHome, IoVideocam, IoPerson, IoAlertCircleOutline, IoCalendarOutline } from "react-icons/io5";
import Modal from 'react-modal';
import { useEffect, useState, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import api from "../../services/api";
import { AuthContext } from "../../contexts/Auth";
import {IoArrowBackOutline, IoArrowForwardOutline} from "react-icons/io5";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ReactTooltip from 'react-tooltip';

export function NewScheduling({idEvaluation, image, title, email, phone, whatsapp, name, address}) {
  const Local = localStorage.getItem("adm-suachave");
  const user = JSON.parse(Local);

    const [view, setView] = useState("")

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const {newScheduling, loginSessionFast, loading} = useContext(AuthContext)

    const [isOpenModal, setIsOpenModa] = useState(false);
    const [isOpenModalLogin, setIsOpenModaLogin] = useState(false);
    const [isOpenModalLogin2, setIsOpenModaLogin2] = useState(false);


    const [dateSelected, setDateSelected] = useState();
    const [shift, setShift] = useState();
    const [hour, setHour] = useState();
    const [ownACar, setOwnACar] = useState();
    const [similarProperties, setSimilarProperties] = useState();
    const [amountOfPeople, setAmountOfPeople] = useState();
    const [meet, setMeet] = useState();

    const [property, setProperty] = useState();
    const [company, setCompany] = useState();
  
    const [nameNew, setNameNew] = useState("");
    const [whatsappNew, setWhatsappNew] = useState("");

    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")

    const [days, setDays] = useState([]);


    useEffect(() => {
        async function loadEvaluation() {
          await api.get(`/evaluation/company/${idEvaluation}`)
        }

        loadEvaluation()
    },[])


    const myConfig = {
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
          {Turno: "Noite"}
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
           Turno: "Manhã",
           Horário: "14:00 - 15:00"
         },
                 {
           Turno: "Manhã",
           Horário: "15:00 - 16:00"
         },
                 {
           Turno: "Manhã",
           Horário: "16:00 - 17:00"
         }
       ]},
      }
    

      const filterShifts = new Date(dateSelected).getDay() === 0 ? myConfig.Sunday.Shifts 
      : new Date(dateSelected).getDay() === 1 ? myConfig.Monday.Shifts 
      : new Date(dateSelected).getDay() === 2 ? myConfig.Tuesday.Shifts 
      : new Date(dateSelected).getDay() === 3 ? myConfig.Wednesday.Shifts 
      : new Date(dateSelected).getDay() === 4 ? myConfig.Thursday.Shifts 
      : new Date(dateSelected).getDay() === 5 ? myConfig.Friday.Shifts 
      : new Date(dateSelected).getDay() === 6 ? myConfig.Saturday.Shifts 
      : []
      const filterSchedules = new Date(dateSelected).getDay() === 0 ? myConfig.Sunday.Schedules
      : new Date(dateSelected).getDay() === 1 ? myConfig.Monday.Schedules
      : new Date(dateSelected).getDay() === 2 ? myConfig.Tuesday.Schedules 
      : new Date(dateSelected).getDay() === 3 ? myConfig.Wednesday.Schedules 
      : new Date(dateSelected).getDay() === 4 ? myConfig.Thursday.Schedules 
      : new Date(dateSelected).getDay() === 5 ? myConfig.Friday.Schedules 
      : new Date(dateSelected).getDay() === 6 ? myConfig.Saturday.Schedules 
      : []


    useEffect(() => {
        function dateToString(d) {
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(d => d > 9 ? d : '0' + d).join('-');
          }
          
          var hoje = new Date();
          var ano = hoje.getFullYear();
          var mes = hoje.getMonth();
          var dia = hoje.getDate();
          for (var i = 0; i < 30; i++) {
            var outroDia = new Date(ano, mes, dia + i);
          // console.log(dateToString(outroDia));

            const data = [{
              dataCompleta: outroDia,
                diaSemana: new Date(outroDia).getDay() === 0 ? "Domingo"
                : new Date(outroDia).getDay() === 1 ? "Segunda-Feira"
                : new Date(outroDia).getDay() === 2 ? "Terça-Feira"
                : new Date(outroDia).getDay() === 3 ? "Quarta-Feira"
                : new Date(outroDia).getDay() === 4 ? "Quinta-Feira"
                : new Date(outroDia).getDay() === 5 ? "Sexta-Feira"
                : new Date(outroDia).getDay() === 6 ? "Sábado"
                : "",
                dia: new Date(outroDia).getDate(),
                mes: new Date(outroDia).getMonth() + 1 === 1 ? "Janeiro"
                : new Date(outroDia).getMonth() + 1 === 2 ? "Fevereiro"
                : new Date(outroDia).getMonth() + 1 === 3 ? "Março"
                : new Date(outroDia).getMonth() + 1 === 4 ? "Abril"
                : new Date(outroDia).getMonth() + 1 === 5 ? "Maio"
                : new Date(outroDia).getMonth() + 1 === 6 ? "Junho"
                : new Date(outroDia).getMonth() + 1 === 7 ? "Julho"
                : new Date(outroDia).getMonth() + 1 === 8 ? "Agosto"
                : new Date(outroDia).getMonth() + 1 === 9 ? "Setembro"
                : new Date(outroDia).getMonth() + 1 === 10 ? "Outubro"
                : new Date(outroDia).getMonth() + 1 === 11 ? "Novembro"
                : new Date(outroDia).getMonth() + 1 === 12 ? "Dezembro"
                : "",
                ano: new Date(outroDia).getFullYear(),
            }]
            setDays(oldDays => [...oldDays, ...data])
          }
    }, [])

    useEffect(() => {
        function getLocation() {
            return window.navigator.geolocation.getCurrentPosition(success, error);
             }
  
        function success(position) {
            const lat1  = position.coords.latitude;
            const long1 = position.coords.longitude;

            console.log(lat1, long1);
        
            setLatitude(lat1);
            setLongitude(long1);
            
          }

      function error() {
        console.log('Unable to retrieve your location');
      }

      getLocation()
  
    },[])

    

    function handleNewScheduling() {
        const status = "Aprovado"
        newScheduling({
          idEvaluation, idCompany: user.id,  titleProperty: title, imageProperty: image, email: email, phone: phone,
            whatsapp: whatsapp, status, meet,
            day: new Date(dateSelected).getDate(), month: new Date(dateSelected).getMonth()+1, year: new Date(dateSelected).getFullYear(),
            shift, hour, ownACar, location: meet === "Imobiliária" ? user.fantasyName : "No local do imóvel",
            address: meet === "Imobiliária" ? `${user.road} - Nº ${user.number} - ${user.district} - ${user.city} - ${user.uf}` : address,
            amountOfPeople, nameClient: name,
            similarProperties, dateCompleted: new Date(dateSelected), type: "Avaliação de imóvel"
        })

    }

      function selectDate(date) {
        setDateSelected(date)
      }

    function handleOpenModal(e) {
      e.preventDefault();
        setIsOpenModa(true)
      }
    
      function handleCloseModal(e) {
        e.preventDefault();
        setIsOpenModa(false);
        setView("")
      }



      function handleShift(e) {
        setShift(e.target.value);
      }
      function handleHour(e) {
        setHour(e.target.value);
      }

      function handleMeet(e) {
        setMeet(e.target.value);
      }


      const buttonStyle = {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'var(--BorderInput)',
        color: 'var(--Primary)',
        borderRadius: '100px',
        padding: '7px',
        width: '25px',
        height: '25px',
        border: '1px solid var(--Primary)',

        svg:{
          margin: '0px'
        }
    };
    
    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><IoArrowBackOutline /></button>,
        nextArrow: <button style={{ ...buttonStyle }}><IoArrowForwardOutline /></button>
    }

    const responsiveSettings = [
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 250,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 150,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

    const filterWeek = days.filter((day) =>  myConfig.Sunday.Active === false && day.diaSemana === "Domingo" ? day.diaSemana !== "Domingo"
                                            : myConfig.Monday.Active === false && day.diaSemana === "Segunda-Feira" ? day.diaSemana !== "Segunda-Feira"  
                                            : myConfig.Tuesday.Active === false && day.diaSemana === "Terça-Feira" ? day.diaSemana !== "Terça-Feira"  
                                            : myConfig.Wednesday.Active === false && day.diaSemana === "Quarta-Feira" ? day.diaSemana !== "Quarta-Feira"  
                                            : myConfig.Thursday.Active === false && day.diaSemana === "Quinta-Feira" ? day.diaSemana !== "Quinta-Feira"  
                                            : myConfig.Friday.Active === false && day.diaSemana === "Sexta-Feira" ? day.diaSemana !== "Sexta-Feira"  
                                            : myConfig.Saturday.Active === false && day.diaSemana === "Sábado" ? day.diaSemana !== "Sábado"  
                                              : day);


    Modal.setAppElement('#root');
    return (
        <>
        <button onClick={handleOpenModal} className="btnControl" data-tip data-for='Agendar avaliação'><IoCalendarOutline /></button>
                        <ReactTooltip id='Agendar avaliação' place="bottom" type="dark" effect="solid">
                         <span>Agendar avaliação</span>
                        </ReactTooltip>

        <Modal isOpen={isOpenModal} onRequestClose={handleCloseModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button type="button" className="react-modal-button" onClick={handleCloseModal}>
            <IoCloseOutline /> 
            </button>
            <div className="content-modal-scheduling">

            <div className="itensModal-scheduling">
               <div className="textTitle">
              <h2 className="title">  Novo agendamento</h2>
              </div>
                {/* <Calendar onChange={onChange} value={value} /> */}


                <div className="listDays">
                  <Slide slidesToScroll={2} slidesToShow={2} autoplay={false} infinite={false} {...properties} responsive={responsiveSettings}>
                    {filterWeek?.map((date) => {
                        return (
                         
                            <div className={date.dataCompleta === dateSelected ? "CardDaySelected": "CardDay" } onClick={() => selectDate(date.dataCompleta)}>
                                <h4>{date.diaSemana}</h4>
                                <h2>{date.dia}</h2>
                                <h5>{date.mes} - {date.ano}</h5>
                            </div>
                        )
                    })}
                  </Slide>
                </div>

                <div className="form">
                <div className="data">
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Turno</p>
                    </div>
                     <select style={{borderRadius: 25}}  value={shift} onChange={handleShift}>
                       <option value="Escolha">Escolha</option>
                        {filterShifts.map((shift) => {
                          return (
                            <option value={shift.Turno}>{shift.Turno}</option>
                          )
                        })
                        }              
                </select>
                    </div>
                    <div className="infosData">
                    <div className="textModal-scheduling">
                        <p>Escolha um horário</p>
                    </div>
                    <select style={{borderRadius: 25}}  value={hour} onChange={handleHour}>

                         <option value="Escolha">Escolha</option>
                        {filterSchedules.map((shedule) => {
                          return (
                            shedule.Turno !== shift ? "" :
                            <option value={shedule.Horário}>{shedule.Horário}</option>
                          )
                        })
                        }              

                </select> 
                    </div>

                </div>

                    <div className="data">
                    <div className="infosData">
                  <div className="textModal-scheduling">
                      <p>Local de encontro</p>
                  </div>
                  <select style={{borderRadius: 25}}  value={meet} onChange={handleMeet}>
                      <option value="Escolha">Local de encontro</option>
                      <option value="Imobiliária">Imobiliária</option>
                      <option value="Endereço do imóvel">Endereço do imóvel</option>
                  </select>
                  </div>
              </div>
              
              <div className="textModal-scheduling">
                                      <p>Endereço de encontro</p>
                    </div>
                  {meet === "Imobiliária" ?
                <div className="address">
                    <p><IoBusinessOutline />{user?.fantasyName}</p>
                    <p><IoLocationOutline />{user?.road} - Nº {user?.number} - {user?.district} - {user?.city} - {user?.uf}</p>
                </div>
                : meet === "Endereço do imóvel" ?
                <div className="address">
                    <p><IoLocationOutline />{address}</p>
                </div>
                : ""
                  }

                <button style={{borderRadius: 25}}  className="btnSubmit" onClick={handleNewScheduling}>Enviar solicitação de agendamento</button>
               
                </div>
            </div>

            </div>
            </Modal>

        </>
    )
}
