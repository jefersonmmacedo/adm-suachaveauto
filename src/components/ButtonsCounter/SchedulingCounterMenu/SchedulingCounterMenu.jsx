import "./schedulingCounterMenu.css"
import { IoCalendarOutline } from 'react-icons/io5';
import ReactTooltip from 'react-tooltip';
import { useFetch } from "../../../hooks/useFetch";

export function SchedulingCounterMenu() {
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
       <div className="buttonCounterMenu" onClick={() => HandleOpenLink("/agendamentos")}>
       {filterCounterScheduling?.length === 0 ? "" :
        <div className="counterMenu">
         {filterCounterScheduling?.length}                                                    
        </div>
      }
            </div>
    )
}