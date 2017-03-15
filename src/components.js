import React from 'react'
import { connect } from 'react-redux'

// We recieve the top-level store, with most important keys 
// - antares - where 'permanent' data reside
// - view - specifics to this view, such as sort order
// Each come back as immutable objects, let's select the part
// we want and return as JS for demo purposes.
const stateMapper = state => {
    return state.antares && state.antares.get('Declan').toJS()
}

// Our state mapper provides new fields to each component
export const WelcomeComponent = connect(stateMapper)(({ face, sendASmile }) => (
    <div>
        <button onClick={ sendASmile }>Make Declan Smile!</button>
        <div style={{ fontSize: '500%' }}>{ face }</div>
    </div>
))

export const Smiler = connect(stateMapper)(({ fans, face, sendASmile }) => (
    <div>
        <button onClick={ sendASmile }>Make Declan Smile!</button>
        <div style={{ fontSize: `${(fans-1) * 500}%` }}>{ face }</div>
    </div>
))