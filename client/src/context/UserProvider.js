import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const userAxios = axios.create()

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserContext = React.createContext()

class UserProvider extends Component {
    constructor(){
        super()
        this.state = {
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.token || ""
        }
    }

    signup = credentials => {
        axios.post("/auth/signup", credentials).then(res => {
            console.log('resolution')
            const { user, token } = res.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user, token })
        })
        .catch(err => console.log(err))
    }

    // createchatuser = () => {
    //     const { user, token } = this.state

    //     axios.post(`https://us1.pusherplatform.io/services/chatkit/v3/:v1:us1:aeb802c1-dbcb-4bd8-9577-fd542318a5f9/users/${user}`, {id: `${user._id}` , name: user}).then(res => {
            
    //     }).catch(err => console.log(err))
    // }

    login = credentials => {
        axios.post("/auth/login", credentials).then(res => {
            console.log('hello')
            const { user, token } = res.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)
            this.setState({ user, token })
        })
        .catch(err => console.log(err))
    }

    logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.setState({ user: {}, token: ""})
    }

    // getProtectedStuff = () => {
    //     userAxios.get(`https://us1.pusherplatform.io/services/chatkit/v3/:v1:us1:aeb802c1-dbcb-4bd8-9577-fd542318a5f9/users/${user_id}`).then(res => {

    //     }).catch(err => console.log(err))
    // }

    render(){
        return (
            <UserContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout
                }}>
                { this.props.children }
            </UserContext.Provider>
        )
    }
}

export default withRouter(UserProvider)



export const withUser = C => props => (
    <UserContext.Consumer>
        { value => <C {...props} {...value}/>}
    </UserContext.Consumer>
)