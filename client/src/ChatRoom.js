import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './components/MessageList.js'
import SendMessageForm from './components/SendMessageForm.js'
import RoomList from "./components/RoomList.js"
import NewRoomForm from "./components/NewRoomForm.js"
import { withUser } from './context/UserProvider.js'
import { tokenUrl, instanceLocator } from './config.js'
import "./Style.css"



class ChatRoom extends React.Component {
  
  constructor() {
    super()
    this.state = {
        roomId: null,
        messages: [],
        joinableRooms: [],
        joinedRooms: []
    }
    this.currentUser = null
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
}

componentDidMount() {
  let tokenProvider = new Chatkit.TokenProvider({
    url: tokenUrl
  })

  const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "default",
      tokenProvider: tokenProvider
  });
  
  chatManager.connect()
  .then(currentUser => {
      this.currentUser = currentUser
      console.log(this.currentUser)
      this.getRooms()

  })
  .catch(err => console.log('error on connecting: ', err))
}
  

  getRooms() {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
        this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
        })
    })
    .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
            onNewMessage: message => {
                this.setState({
                    messages: [...this.state.messages, message]
                })
            }
        }
    })
    .then(room => {
        this.setState({
            roomId: room.id
        })
        this.getRooms()
        
    })
    .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    
    // console.log(this.currentUser)
    // console.log(text)
    this.currentUser.sendMessage({
        text: text,
        roomId: this.state.roomId
    })
    .then(messageId => {
      this.fetchMessages()
     
    })
    .catch(err => {
      console.log(`Error adding message: ${err}`)
    })
  }

  
fetchMessages(){
  console.log(this.state.roomId)
  this.currentUser.fetchMessages({
    roomId: this.state.roomId
  })
  .then(messages => {
    console.log(messages)
    this.setState({messages: messages })
  })
  .catch(err => {
    console.log(`Error fetching messages`)
  })
}


  createRoom(name) {
  
    this.currentUser.createRoom({
        name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(err => console.log('error with createRoom: ', err))
  }

  render() {

    const { user, token } = this.props

    return (
      <div className="chatroom">

        <div className="rooms-list">
          <RoomList
              
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
              roomId={this.state.roomId}/>
        </div>
        <div className="message-list">
          <MessageList
             n 
              roomId={this.state.roomId}
              messages={this.state.messages}/>
        </div>
        <div className="send-message-form">
          <SendMessageForm
              
              disabled={!this.state.roomId}
              sendMessage={this.sendMessage} />
        </div>
        <div className="new-room-form" >
          <NewRoomForm
              
              createRoom={this.createRoom}/>
        </div>
      </div>
    )
  }
}

export default withUser(ChatRoom)
