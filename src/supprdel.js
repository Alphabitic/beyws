import React, { Component } from 'react'
import App from './App';

export class supprdel extends Component {
  render() {
    return (
      <div><App items={this.state.contacts} deleteData={this.deleteData.bind(this)}/></div>
    )
  }
}

export default supprdel