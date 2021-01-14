import './App.css'
import React, { useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, Tag } from 'antd'

function App() {

	const [start, setStart] = useState(false)
	const [username, setUsername] = useState('')
	const [reciever, setReciever] = useState('')
	const [body, setBody] = useState('')
	const { data, sendMessage, clearMessages } = useChat(username, reciever, body)
	const bodyRef = useRef(null)

	return ( 
		!start ? (
			<div className="App">
				<div className="App-title">
					<h1>Simple Chatroom</h1>
				</div>
				<div className='App-message'>
					<Input
					placeholder="Enter Your Username"
					value={username}
					style={{ marginTop: 20 }}
					onChange={(e) => setUsername(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setStart(true)
						}
					}}
					></Input>
				</div>
			</div>
		) : (
			<div className="App">
				<div className="App-title">
					<h1>Simple Chat</h1>
					<Button type="primary" danger onClick={() => clearMessages(username)}>
						Clear
					</Button>
				</div>
				<div className="App-messages">
					{ data.messages.length === 0 ? (
						<p style={{ color: '#ccc' }}> No Message... </p>
					) : (
						data.messages.filter(msg => msg.from === username || msg.to === username).map((msg, i) => (
							<p className="App-message" key={i}>
								<Tag color="blue">
									{ username === msg.from ? "To: " + msg.to : "From: " + msg.from }
								</Tag> { msg.body }
							</p>
						))
					)}
			</div>
			<Input
			placeholder="Reciever's Name"
			value={reciever}
			onChange={(e) => setReciever(e.target.value)}
			style={{ marginBottom: 10 }}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					bodyRef.current.focus()
				}
			}}
			></Input>
			<Input.Search
			rows={4}
			value={body}
			ref={bodyRef}
			enterButton="Send"
			onChange={(e) => setBody(e.target.value)}
			placeholder="Type the message here..."
			onSearch={(msg) => {
				if ( body !== '' ) {
					sendMessage({ from: username, to: reciever, body: msg })
					setBody('')
				}
			}}
			></Input.Search>
		</div>
		) 
	)
}

export default App
