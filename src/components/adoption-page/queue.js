import React, { Component } from 'react'

export default class Queue extends Component {
  render() {
    return (
      <div  className='queue'>
        <span>{this.props.name}</span>
      </div>
    )
  }
}
