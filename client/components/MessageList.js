import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message.js'

class MessageList extends React.Component {
    
    componentWillUpdate() {
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }
    componentDidUpdate() {
        if(this.shouldScrollToBottom){
            const node = ReactDom.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }

    render(){
        if(!this.props.roomId){
            return(
                <div className = "message-list"> 
                    <div className= "join-room">
                        &larr; Join a Room!
                    </div>
                </div>
            )
        }
        return(
            <div className="message-list">
                {this.props.messages.map((message, index) =>{
                return(
                    <Message key={message.id} username={message.senderId} text={message.text} />
                )
                })}
            </div>
        )
    }
}

export default MessageList