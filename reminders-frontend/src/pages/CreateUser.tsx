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

    async function formSubmit(e:any){
        e.preventDefault();
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

    return(
        <div className="registration-div">
            <form onSubmit={formSubmit} className="registration-form">
                <h2>Register</h2>
                <div className="registration-form-item">
                    <label htmlFor="username">Username: </label>
                    <input placeholder="Username" name='username' onChange={handlechange}/>
                </div>
                
                <div className="registration-form-item">
                    <label htmlFor="password">Password:</label>
                    <input placeholder="Password" name = 'password' onChange={handlechange} type="password"/>
                </div>

                <div className="registration-form-item">
                    <label htmlFor="passwordConfirmation">Password Confirmation:</label>
                    <input placeholder="Password Confirmation" name="passwordConfirmation" onChange={handlechange} type="password"/>
                </div>
                
                <input type="submit" value="Register" className="register-button"/>
                <div>{error}</div>
            </form>
        </div>
    )
}