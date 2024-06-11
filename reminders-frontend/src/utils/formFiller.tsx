import React, { SetStateAction } from 'react'


export default function useFormFiller(setData:any){

    function fillState(event:any){
        const target = event.currentTarget
        setData((prev:any)=>{
            return{
                ...prev,
                [target.name]: target.value
            }
        })
        
    }

    return [fillState]
}

