import { parseISO, format} from 'date-fns';
import {IoPeopleOutline} from 'react-icons/io5';
import "./dateFormatComplete.css"

function DateFormatComplete({date, type}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
    "dd'/'MM'/'yyyy'"
    );

    return (
        <>
       {datePost}
        </>)
    
}

export {DateFormat}