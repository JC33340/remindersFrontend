import React from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    let {loginUser,message} = React.useContext(AuthContext)

    return (
        <div className='login-div'>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit"/>
            </form>
            <div>{message}</div>
        </div>
    )
}

export default LoginPage