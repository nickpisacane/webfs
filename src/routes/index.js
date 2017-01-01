import React from 'react'
import { Router, IndexRoute, Route, Link } from 'react-router'
import Layout from './Layout'

export default (
  <Route path='/' component={Layout}>
    <Route path='*' component={() => <h1>TODO</h1>} />
  </Route>
)
