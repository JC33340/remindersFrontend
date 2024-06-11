import React from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const {user,authTokens,logoutUser} = React.useContext(AuthContext)

    let [profile, setProfile] = React.useState<{user:{},first_name:string}>()
    let navigate = useNavigate()

    React.useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        let response = await fetch('http://127.0.0.1:8000/backend/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        if(response.status === 200){
            setProfile(data)
        } else if (response.status === 400){
            navigate('/create-profile')
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }


    return (
        user ? (
        <div>
            <p>Welcome {profile?`${profile?.first_name[0].toUpperCase()}${profile?.first_name.slice(1)}`:''}</p> 
        </div>
        ):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    )
}

export default HomePage