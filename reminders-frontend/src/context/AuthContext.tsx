import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate,Outlet } from 'react-router-dom';
import { log } from 'console';

const AuthContext = createContext<any|null>(null)

export default AuthContext;

export function AuthProvider(){
    let [user, setUser] = useState<any|null>(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')||'{}') : null))
    let [authTokens, setAuthTokens] = useState<{refresh:string,access:string}|null>(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')||'{}') : null))
    const [message,setMessage] = useState<string>("")
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    let loginUser = async (e:any) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/backend/token/',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        })
        let data = await response.json()
        if (data.access){
            localStorage.setItem('authTokens',JSON.stringify(data))
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            navigate('/')
        } else if (data.detail){
            setMessage('This account does not exist')
        } else {
            alert('Something went wrong while logging in ')
        }
    }

    let logoutUser = () => {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({refresh:authTokens?.refresh})
        })

        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        message: message
    }

    return(
        <AuthContext.Provider value={contextData}>
            <Outlet />
        </AuthContext.Provider>
    )
}