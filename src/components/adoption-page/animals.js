import React, { Component } from 'react'

export default class Animals extends Component {
  render() {
    return (
      <div>
        <img className='animal-pic' src={this.props.picture} alt={this.props.description} width='150' height='150'></img>
        <ul>
          <li><span>Description: {this.props.description}</span></li>
          <li><span>Name: {this.props.name}</span></li>
          <li><span>Gender: {this.props.gender}</span></li>
          <li><span>Breed: {this.props.breed}</span></li>
          <li><span>Story: {this.props.story}</span></li>
        </ul>
      </div>
    )
  }
}
