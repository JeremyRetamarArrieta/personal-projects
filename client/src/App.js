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



class App extends Component {

    render (props) {
        const token = this.props.token
        const user = this.props.user
    return (
        <div className='app'>
            <Navbar 
            token = {token}/>
        <Switch>
          <Route 
            path="/" 
            render={rProps =>  token ? <Redirect to="/home"/> : <AuthContainer {...rProps}/>}/>
          <ProtectedRoute
            token={token}
            path="/home"
            redirectedTo="/login"
            component={Home}
            username={user.username}/>
            <Route path='/contact' component={Contact} />
            <Route path='/chatroom' component={ChatRoom} />
        </Switch>
        </div>
    )
    }
}

export default withUser(App);

