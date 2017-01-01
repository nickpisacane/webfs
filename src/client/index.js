import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import routes from '../routes'
import theme from '../theme'

injectTapEventPlugin()
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: { credentials: 'same-origin' }
  })
})

render((
  <ApolloProvider client={client}>
    <MuiThemeProvider muiTheme={theme()}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>
), document.getElementById('root'))
