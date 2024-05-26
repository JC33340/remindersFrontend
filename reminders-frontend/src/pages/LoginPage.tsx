import React from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    let {loginUser,message} = React.useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
            </form>
            <div>{message}</div>
        </div>
    )
}

export default LoginPage