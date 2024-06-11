import React from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useFormFiller from "../utils/formFiller"

export default function CreateProfile(){
    const {user,authTokens,logoutUser, api} = React.useContext(AuthContext)
    let navigate = useNavigate()
    interface Datatype{
        firstName:String, 
        lastName:String, 
        email:String
    }
    let [data,setData] = React.useState<Datatype>()
    let [onChange] = useFormFiller(setData)

    let arrayKey = ['firstName','lastName','email']
    let [errorMessage, setErrorMessage] = React.useState<String>()

    React.useEffect(() =>{
        getProfile()
    },[])

    const getProfile = async()=>{
        let response = await fetch(`${api}profile/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        if (response.status === 200){
            navigate('')
        } else {
            return
        }
    }

    function createProfile(event:any){
        event.preventDefault()
        if (data){
            let keys = Object.keys(data)
            console.log(keys)
            console.log('yuh')
            apiProfile()
        } else {
            setErrorMessage("Please fill in all boxes")
        }
        
    }

    const apiProfile = async()=>{
        let response = await fetch(`${api}profile/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify(data)
        })
        if (response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    return(
        <div className="login-div">
            <form className="login-form" onSubmit={createProfile}>
                <h2>Profile details</h2>
                <div className="login-form-item">
                    <label htmlFor="firstName">First name: </label>
                    <input type="text" placeholder="First name" name="firstName" onChange={onChange}/>
                </div>
                <div className="login-form-item">
                    <label htmlFor="lastName">Last name: </label>
                    <input type="text" placeholder="Last name" name="lastName" onChange={onChange}/>
                </div>
                <div className="login-form-item">
                    <label htmlFor="email">Email:</label>
                    <input type="text" placeholder="email" name="email" onChange={onChange}/>
                </div>
                <input type="submit" value="Create Profile" className="login-button"/>
                <div className='login-message'>{errorMessage}</div>
            </form>
            
            
        </div>
    )
}