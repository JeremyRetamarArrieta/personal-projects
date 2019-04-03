import React from 'react'
import {withUser} from '../../context/UserProvider.js'

const AuthForm = props => {
    const {handleSubmit, handleChange, inputs, btnText} = props
    return (
        <form>
            <input 
                type="text" 
                name="username" 
                onChange={handleChange} 
                value={props.username} 
                placeholder="Username" 
                required/>
            <input 
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