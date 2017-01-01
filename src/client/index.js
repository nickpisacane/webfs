import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import routes from '../routes'
import muiTheme from './muiTheme'

injectTapEventPlugin()
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: { credentials: 'same-origin' }
  })
})

render((
  <ApolloProvider client={client}>
    <MuiThemeProvider muiTheme={muiTheme()}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>
), document.getElementById('root'))
