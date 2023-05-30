import { parseISO, format} from 'date-fns';
import {IoPeopleOutline} from 'react-icons/io5';
import "./dateFormat.css"

function DateFormat({date, type}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
    "dd'/'MM'/'yyyy'"
    );

    return (
        <>
        <h4>{datePost}</h4>
        </>)
    
}

export {DateFormat}