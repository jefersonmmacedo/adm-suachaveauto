import "./schedulingCounter.css"
import { IoCalendarOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../../hooks/useFetch";

export function SchedulingCounter() {
  const LocalCity = localStorage.getItem("adm-suachave");
  const user = JSON.parse(LocalCity);

  const {data} = useFetch(`/scheduling/client/${user.id}`)

  const filterCounterScheduling = data?.filter((filterData) => new Date(filterData.created_at).getDate() === new Date().getDate()
                                                              && new Date(filterData.created_at).getMonth()+1  === new Date().getMonth()+1
                                                              && new Date(filterData.created_at).getFullYear() === new Date().getFullYear())


    function HandleOpenLink(data) {
        window.open(`${data}`, "_self")
      }
    return (
       <div className="buttonCounter">
       {filterCounterScheduling?.length === 0 ? "" :
        <div className="counter">
         {filterCounterScheduling?.length}                                                    
        </div>
      }
       <button className='iconUnic' onClick={() => HandleOpenLink("/agendamentos")} data-tip data-for='Agendamentos'><IoCalendarOutline/></button>
                <ReactTooltip id='Agendamentos' place="bottom" type="dark" effect="solid">
                     <span>Agendamentos</span>
                </ReactTooltip>
            </div>
    )
}