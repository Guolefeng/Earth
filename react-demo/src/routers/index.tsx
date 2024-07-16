import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import routes from '@/config/routes'
import RouteWidthLayout from './routeWithLayout'
import NotFound from '@/pages/Error/404'

const Roots = () => {
    return (
        <Router>
            <Switch>
                {routes.combineRoutes.map((props: any, i: number) => (<RouteWidthLayout key={i} {...props} />))}
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default Roots