import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList.js'
import SendMessageForm from './components/SendMessageForm.js'
import RoomList from "./components/RoomList.js"
import NewRoomForm from "./components/NewRoomForm.js"
import "./Style.css"
import { Switch, Route, Redirect } from 'react-router-dom'
import { withUser } from './context/UserProvider.js'
import AuthContainer from './components/auth/AuthContainer.js'

import { tokenUrl, instanceLocator } from './config.js'

const { user, token, signup, login } = props

class App extends Component {


  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: tokenUrl
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: 'Jeremy',
      tokenProvider: tokenProvider
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 19391833,
        hooks: {
            onNewMessage: message => {
              console.log('message.text', message.text)
            }
        }
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route 
            path="/login" 
              render={rProps => 
                <AuthContainer 
                {...rProps}
                signup={signup}
                login={login}/>}/>
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
        </Switch>
      </div>
    )
  }
}

export default withUser(App)
