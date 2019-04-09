import React, { Component } from 'react'
import "./Style.css"
import { Switch, Route, Redirect } from 'react-router-dom'
import { withUser } from './context/UserProvider.js'
import AuthContainer from './components/auth/AuthContainer.js'
import Navbar from './routes/Navbar.js'
import Home from './components/Home.js'
import ProtectedRoute from './shared/ProtectedRoute.js'
import Contact from './components/Contact.js'
import ChatRoom from './ChatRoom.js'
import Posts from './components/Posts.js'


class App extends Component {

    render () {
        const token = this.props.token
        const user = this.props.user
        const logout = this.props.logout
    return (
        <div className='app'>
            <Navbar
            className='navbar' 
            token = {token}/>
        <Switch>
            <Route 
                exact path="/" 
                render={rProps =>  token ? <Redirect to="/home"/> : <Redirect to="/login"/>}/>
            <Route 
                path="/login"
                render={rProps =>  token ? <Redirect to="/home"/> : <AuthContainer {...rProps}/>}/>
            />
            <ProtectedRoute
                token={token}
                path="/home"
                redirectedTo="/login"
                component={Home}
                username={user.username}
                logout={logout}/>
                <Route path='/contact' component={Contact} />
                <Route path='/chatroom' component={ChatRoom} />
                <Route path='/posts' component={Posts} />
        </Switch>
        </div>
    )
    }
}

export default withUser(App);

