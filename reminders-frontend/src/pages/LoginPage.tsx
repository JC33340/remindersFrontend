import React from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    let {loginUser,message} = React.useContext(AuthContext)

    return (
        <div className='login-div'>
            <form onSubmit={loginUser} className='login-form'>
                <h2>Login</h2>
                <div className='login-form-item'>
                    <label htmlFor='username'>Username:</label>
                    <input type="text" id ='username' name="username" placeholder="Username"/>
                </div>
                
                <div className='login-form-item'>
                    <label htmlFor='password'>Password: </label>
                    <input type="password" name="password" placeholder="Password"/>
                </div>

                <input type="submit" className='login-button' value='Login'/>
                <div className='login-message'>{message}</div>
            </form>
            
        </div>
    )
}

export default LoginPage