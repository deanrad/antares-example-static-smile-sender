import React from 'react'

export const WelcomeComponent = ({ sendASmile }) => (
    <div>
    <p>Ho Hum.</p>
    <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
)

export const Smiler = ({ sendASmile }) => (
    <div>
        <div style={{ fontSize: '1000%' }}>:)</div>
        <br/>
        <button onClick={ sendASmile }>Send A Smile!</button>
    </div>
)
