import React from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function CreateUser(){

    interface userData {[username:string]:string,password:string,passwordConfirmation:string}

    const [userData,setUserData] = React.useState<userData>({username:'',password:'',passwordConfirmation:''})
    const [error,setError] = React.useState<string>('')
    const {api} = React.useContext(AuthContext)
    const navigate =useNavigate()

    function handlechange(event:React.FormEvent<HTMLInputElement>){
        const value = event.currentTarget.value
        const name = event.currentTarget.name
        setUserData(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    async function formSubmit(){
        
        for (var key in userData){
            if (userData[key] === ''){
                setError('Please fill all fields')
                return
            }
        }
        if (userData.password !== userData.passwordConfirmation){
            setError('Passwords do not match')
            return
        } else {
            const response = await fetch(api + 'create_user/',{
                method:"POST",
                body:JSON.stringify({username:userData.username,password:userData.password,passwordConfirmation:userData.password})
            })
            const data = await response.json()
            if (response.status === 400){
                return setError(data)
            } else if (response.status === 200){
                return navigate('/login')
            } else{
                return setError('Server error')
            }
        }
    }

    console.log(userData)
    return(
        <div>
            <input placeholder="Username" name='username' onChange={handlechange}/>
            <input placeholder="Password" name = 'password' onChange={handlechange} type="password"/>
            <input placeholder="Password Confirmation" name="passwordConfirmation" onChange={handlechange} type="password"/>
            <div onClick={formSubmit}>Register</div>
            <div>{error}</div>

        </div>
    )
}