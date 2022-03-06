import React from 'react'

import Header from './index'
// import { MemoryRouter, Route } from 'react-router';

export default {
    title: 'Header',
    component: Header
}

const props = {
    location: {state: 'OH'},
    history: []
}
export const Default = () => {
    return (
        <Header {...props} />
    )
}
