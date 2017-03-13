import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AntaresInit } from 'antares-protocol'
import { WelcomeComponent, Smiler } from './components'

// Connect us to a websocket
let Antares = AntaresInit({
    connectionUrl: 'ws://antares-example-smile-sender.herokuapp.com/websocket'
    //connectionUrl: 'ws://localhost:7777/websocket'
})
// Expose in consolefor demo purposes
Object.assign(window, { Antares })
// And listen for everything!
Antares.subscribe('*')

const eventHandlers = {
    sendASmile: () => {
        Antares.announce('smile!')
    }
}

// Start us up with the welcome element showing..
// An element is an instance of a component
const welcomeElement = <WelcomeComponent { ...eventHandlers } store={ Antares.store }/>
const smilerElement = <Smiler { ...eventHandlers } store={ Antares.store }/>
const reactRoot = document.getElementById('root')
ReactDOM.render(welcomeElement, reactRoot)

// On every Action Antares processes, run this renderer
// in order to display something to the user.
// (We're avoiding using anything from Redux for this demo)
Antares.subscribeRenderer(({ action }) => {
    // We can ask for the action, state, or a diff
    if (action.type !== 'smile!') return

    // Change the DOM
    ReactDOM.render(smilerElement, reactRoot)

    // Change it back in a bit
    setTimeout(() => {
        ReactDOM.render(welcomeElement, reactRoot)
    }, 2000)
})