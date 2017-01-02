import React, { PropTypes } from 'react'

const scriptURL = `http://localhost:8000/__internal__/_bundle.js`
const styles = `
html, body {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
  padding: 0;
  margin: 0;
}
`

export default function Html ({ content, state }) {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>WebFS</title>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
        />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__ = ${JSON.stringify(state)}`
          }}
        />
        <script src={scriptURL} />
      </body>
    </html>
  )
}

Html.propTypes = {
  content: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
}
