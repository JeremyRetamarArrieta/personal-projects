import React from 'react'
import {withUser} from '../../context/UserProvider.js'

const AuthForm = props => {
    const {handleSubmit, handleChange, inputs, btnText} = props
    return (
        <form className="authform" onSubmit={handleSubmit}>
            <input
                className="login-input" 
                type="text" 
                name="username" 
                onChange={handleChange} 
                value={props.username} 
                placeholder="Username" 
                required/>
            <input
                className="login-input" 
                type="password" 
                name="password" 
                onChange={handleChange} 
                value={props.password} 
                placeholder="Password" 
                required/>
            <button>{btnText}</button>
        </form>
    )
}

export default withUser(AuthForm)