import React from 'react'
import Day from './Day'
import "../css/HomePage.css"

export default function CalendarComponent(){
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const dayDisplay = days.map(day=>{return(<Day day={day}/>)})
    return(
    <>
        <div className='weekly-calender-div'>
        {dayDisplay}
        </div>
        
    </>
    )
}