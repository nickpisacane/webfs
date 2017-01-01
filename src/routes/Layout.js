import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

export default class Layout extends Component {
  render () {
    return (
      <div>
        <AppBar title='WebFS' />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
