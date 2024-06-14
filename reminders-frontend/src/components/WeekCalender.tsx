import React from 'react'
import CalenderColumn from './CalenderColumn'
import "../css/HomePage.css"

export default function CalendarComponent(){
    const days = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const dayDisplay = days.map(day=>{return(<CalenderColumn day={day}/>)})
    return(
    <>
        <div className='calender-wrapper'>
        {dayDisplay}
        </div>
        
    </>
    )
}