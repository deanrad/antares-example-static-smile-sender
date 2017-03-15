import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { AntaresInit } from 'antares-protocol'
import { WelcomeComponent, Smiler } from './components'
import * as Actions from './actions'

// Connect us to a websocket
let Antares = AntaresInit({
    connectionUrl: 'ws://antares-example-smile-sender.herokuapp.com/websocket',
    //connectionUrl: 'ws://localhost:7777/websocket',

    // At whatever key (we'll only get one), update
    // the state with the following, using ImmutableJS syntax
    ReducerForKey: key => (state, action) =>
        state.merge({
            ...action.payload,
            fans: action.type === 'cry' ? 2 : state.get('fans') + 1
        })
})
// Expose in consolefor demo purposes
Object.assign(window, { Antares })
// And listen for everything!
Antares.subscribe('*')

const eventHandlers = {
    sendASmile: () => {
        Antares.announce(Actions.smile)
    }
}

// Lets hardcode an object under the key 'Declan'
// to be stored in every agent upon startup
Antares.announce({
    type: 'Antares.store',
    payload: {
        face: ':O',
        fans: 2
    },
    meta: {
        antares: {
            key: 'Declan',
            localOnly: true
        }
    }
})

// Start us up with the welcome element showing..
// An element is an instance of a component
const welcomeElement = <WelcomeComponent { ...eventHandlers } store={Antares.store} />
const smilerElement = <Smiler { ...eventHandlers } store={Antares.store} />
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
        Antares.announce(Actions.cry)
    }, 2000)
})