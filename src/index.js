import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AntaresInit } from 'antares-protocol'

// Connect us to a websocket
let Antares = AntaresInit({
    connectionUrl: 'ws://antares-example-smile-sender.herokuapp.com/websocket'
})
// And listen for everything!
Antares.subscribe('*')

const eventHandlers = {
    sendASmile: () => {
        Antares.announce('smile!')
    }
}

const WelcomeComponent = ({ sendASmile }) => (
    <div>
    <p>Ho Hum.</p>
    <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
)

const Smiler = ({ sendASmile }) => (
    <div>
        <div style={{ fontSize: '1000%' }}>:)</div>
        <br/>
        <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
)

// Start us up with the welcome element showing..
// An element is an instance of a component
const welcomeElement = <WelcomeComponent { ...eventHandlers } />
const smilerElement = <Smiler { ...eventHandlers } />
const reactRoot = document.getElementById('root')
ReactDOM.render(
  welcomeElement,
  reactRoot
)

// Define a function to be called on every state change Antares detects
const reactRenderer = ({ action }) => {
  if (action.type !== 'smile!') return

  ReactDOM.render(smilerElement, reactRoot)
  setTimeout(() => {
    ReactDOM.render(welcomeElement, reactRoot)
  }, 2000)
}

Antares.subscribeRenderer(reactRenderer)

// for demo purposes
Object.assign(window, {
  Antares
})