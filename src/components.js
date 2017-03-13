import React from 'react'
import { connect } from 'react-redux'

export const WelcomeComponent = connect(state => state)(({ sendASmile }) => (
    <div>
    <p>Ho Hum.</p>
    <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
))

export const Smiler = connect(state => state)(({ sendASmile }) => (
    <div>
        <div style={{ fontSize: '1000%' }}>:)</div>
        <br/>
        <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
))