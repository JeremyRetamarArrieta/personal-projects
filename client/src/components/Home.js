import React from 'react'

const Home = ({logout, username}) => {
    return (
        <div>
            <br/>
            <button onClick={logout}>Logout</button>
            <br/>
            Welcome Home {username}
        </div>
    )
}

export default Home