import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'

import routes from '../routes'
import Html from '../routes/Html'
import muiTheme from '../client/muiTheme'

const app = express()
const staticBasePath = path.resolve(path.join(__dirname, '..', '..', 'static'))

app.use('/static', express.static(staticBasePath))

app.use((req, res) => {
  match({
    routes,
    location: req.originalUrl
  }, (err, redirectionLocation, renderProps) => {
    if (redirectionLocation) {
      res.redirect(redirectionLocation.pathname + redirectionLocation.search)
    } else if (err) {
      console.log('ROUTER ERROR: ', err)
      res.status(500)
    } else if (renderProps) {

      const client = new ApolloClient({
        networkInterface: createNetworkInterface({
          ssrMode: true,
          // TODO: Should move away from hardcoded port/uri
          uri: 'http://localhost:8000/graphql',
          opts: { credentials: 'same-origin', headers: req.headers }
        })
      })

      const component = (
        <ApolloProvider client={client}>
          <MuiThemeProvider
            muiTheme={muiTheme({ userAgent: req.headers['user-agent'] })}
          >
            <RouterContext {...renderProps} />
          </MuiThemeProvider>
        </ApolloProvider>
      )

      renderToStringWithData(component).then(content => {
        const html = <Html
          content={content}
          state={client.store.getState()}
        />
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)
      }).catch(err => {
        consle.log('RENDERING ERROR: ', err)
        res.status(500).send('Server Error')
      })
    } else {
      res.status(404).send('Not Found')
    }
  })
})

app.listen(8000)
