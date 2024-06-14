import React from 'react'

interface type{
    day:String
}

export default function CalenderColumn({day}:type){
    var column:JSX.Element[] = []

    for(let i=0;i<25;i++){
        column.push(
            <div className={`calender-day-item ${i===0?'top':''} ${day===''?'axis-item':i===24?'non-axis-item bottom':'non-axis-item'} ${day==='Sunday'?'right':''}`}>
                {i===0?day:''}
                <span>{day===''?i===0?'':`${i}:00`:''}</span>
            </div>
        )
    }
    return(
        <div className='calender-day-wrapper'>
            {column}
        </div>
    )
}