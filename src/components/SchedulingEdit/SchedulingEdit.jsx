import "./schedulingEdit.css";

import Modal from 'react-modal';
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { IoCreateOutline } from "react-icons/io5";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";

export function SchedulingEdit({id, email}) {

    const {updateDataSchedule} = useContext(AuthContext)
    const [isOpenModalProcess, setIsOpenModaProcess] = useState(false);
    const [value, onChange] = useState();
    const [shift, setShift] = useState();
    const [hour, setHour] = useState();


    function handleUpodateScheduling() {
        updateDataSchedule({id, day: new Date(value).getDate(), month: new Date(value).getMonth() +1, year: new Date(value).getFullYear(),
            shift, hour, dateCompleted:value, email})

            setIsOpenModaProcess(false);

            setShift("")
            setHour("")
    }

    function handleOpenModalProcess(e) {
        e.preventDefault();
          setIsOpenModaProcess(true)
        }
      
        function handleCloseModalProcess(e) {
          e.preventDefault();
          setIsOpenModaProcess(false);
        }

        function handleShift(e) {
            setShift(e.target.value);
          }
          function handleHour(e) {
            setHour(e.target.value);
          }

        Modal.setAppElement('#root');
    return (
        <>
            <button onClick={handleOpenModalProcess} className="btnControl" data-tip data-for='Editar'><IoCreateOutline /></button>
            <ReactTooltip id='Editar' place="bottom" type="dark" effect="solid">
            <span>Editar</span>
            </ReactTooltip>


        <Modal isOpen={isOpenModalProcess} onRequestClose={handleCloseModalProcess}
        overlayClassName="react-modal-overlay"
        className="react-modal-content">
 
        <div className="content-moda-Process">
        <div className="itensModal-Process">
            <h3>Editar agendamento</h3>
            <Calendar onChange={onChange} value={value} />

            <div className="form">
                <div className="DataInputs">
                <div className="dataInputUnicSchedule">
                        <h5>Turno</h5>                    
                        <select value={shift} onChange={handleShift}>
                            <option value="Escolha">Escolha</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                    </div>
                <div className="dataInputUnicSchedule">
                    <h5>Horário</h5>
                    <select value={hour} onChange={handleHour}>
                    {shift === "Manhã" ?
                        <>
                         <option value="Escolha">Escolha</option>
                        <option value="08h - 09h">08h - 09h</option>
                        <option value="09h - 10h">09h - 10h</option>
                        <option value="10h - 11h">10h - 11h</option>
                        <option value="11h - 12h">11h - 12h</option>
                        </>
                        : shift === "Tarde" ?
                        <>
                        <option value="Escolha">Escolha</option>
                        <option value="13h - 14h">13h - 14h</option>
                        <option value="14h - 15h">14h - 15h</option>
                        <option value="15h - 16h">15h - 16h</option>
                        <option value="16h - 17h">16h - 17h</option>
                        </>
                        : <option value="Escolha">Escolha Turno</option>}
                         </select>
                    </div>
                </div>
                <div className="ButtonsForm">
                <button className="send" onClick={handleUpodateScheduling}>Atualizar</button>
                <button className="cancel" onClick={handleCloseModalProcess}>X Cancelar</button>
                </div>
            </div>
        </div>
        </div>
        </Modal>
        </>
    )
}