import React from 'react'

interface dayProps{
    day:String
}

export default function Day({day}:dayProps){
    return(
    <div>
        {day}
    </div>
    )
}