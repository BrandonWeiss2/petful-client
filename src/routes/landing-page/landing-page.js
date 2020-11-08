import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import './landing-page.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className='landingPage'>
        <h1>Welcome To the FIFO pet adiption site</h1>
        <section>
          <p>Please review the adoption process before proceeding</p>
          <ul>
            <li><span>Only one person is allowed to adopt at a time</span></li>
            <li><span>Only one cat and one dog will be available for adoption at any point</span></li>
            <li><span>Once it is your turn, you may choose to only the cat and/or the dog that are currently up for adoption</span></li>
            <li><span>Click the button below to be taken to a form where you can enter the queue</span></li>
          </ul>
          <div className='linkDiv'>
            <Link className='link' to={'/adoption'}>Proceed</Link>
          </div>
        </section>
      </div>
    )
  }
}
