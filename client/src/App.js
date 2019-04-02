import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from '../componets/MessageList.js'
import SendMessageForm from '../components/SendMessageForm.js'
import RoomList from "../components/RoomList.js"
import NewRoomForm from "../components/NewRoomForm.js"

import { tokenUrl, instanceLocator } from '.config'


class App extends Component {

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      userId: '1', //swapout later
      tokenProvider: new Chatkit.tokenProvider({
        url: tokenUrl
      })
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
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    )
  }
}

export default App;
