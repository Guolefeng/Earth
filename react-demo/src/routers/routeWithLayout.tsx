import React from 'react'
import { Route } from 'react-router-dom'

const RouteWidthLayout = (props: any) => {
    const { layout, component, ...rest } = props
    return (
        <Route {...rest} render={(props: any) => (
            React.createElement(layout, props, component && React.createElement(component, props))
        )} />
    )
}

export default RouteWidthLayout
