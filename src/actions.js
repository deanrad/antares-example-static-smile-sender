export const smile = () => ({
    type: 'smile!',
    payload: {
        face: ':)'
    },
    meta: { antares: { key: 'Declan' }}
})

export const cry = () => ({
    type: 'cry',
    payload: {
        face: ':O'
    },
    meta: {
        antares: {
            key: 'Declan',
            // each agent reverts to crying by themselves
            localOnly: true
        }
    }
})