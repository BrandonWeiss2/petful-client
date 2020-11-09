import React, { Component } from 'react'
import Animals from '../../components/adoption-page/animals'
import Queue from '../../components/adoption-page/queue'
import AdoptionApiService from '../../service/adoption-api-service'
import './adoption-page.css'

export default class AdoptionPage extends Component {
  state = {
    cat: {},
    dog: {},
    queue: [],
    name: '',
    message: '',
  }
  
  componentDidMount() {
    console.log('componentDidMount')
    AdoptionApiService.getPets()
      .then(this.updateStateAnimals)
    AdoptionApiService.getPeople()
      .then(this.updateStateQueue)
  }

  hanldeContinue = () => {
    this.setState({
      message: '',
    })
  }

  handleAdoptCat = () => {
    this.setState({
      message: `Congrats! You adopted ${this.state.cat.name}`
    })
    AdoptionApiService.deletePets('cat')
      .then(this.updateStateAnimals)
      .then(this.updateStateName(''))
  }

  handleAdoptDog = () => {
    this.setState({
      message: `Congrats! You adopted ${this.state.dog.name}`
    })
    AdoptionApiService.deletePets('Dog')
      .then(this.updateStateAnimals)
      .then(this.updateStateName(''))
  }

  handleAdoptBoth = () => {
    this.setState({
      message: `Congrats! You adopted ${this.state.cat.name} and ${this.state.dog.name}`
    })
    AdoptionApiService.deletePets('Both')
      .then(this.updateStateAnimals)
      .then(this.updateStateName(''))
  }

  handleAdoptNone = () => {
    this.setState({
      message: `You did not adopt a pet`
    })
    this.updateStateName('')
  }

  startQueueUpdate = () => {
    this.intervalId = setInterval(this.queueUpdate, 5000)
  }

  queueUpdate = (type) => {
    if(this.state.name === this.state.queue[0]) {
      return clearInterval(this.intervalId)
    }
    let remove = ''
    let random = Math.floor(Math.random() * Math.floor(2));
    if(random === 1) {
      remove = 'cat' 
    } else {
      remove = 'dog'
    }
    AdoptionApiService.deletePets(remove)
      .then(this.updateStateAnimals)
    AdoptionApiService.deletePeople()
      .then(this.updateStateQueue)
  }

  handleFormSubmit = event => {
    event.preventDefault()
    clearInterval(this.intervalId)
    const { name } = event.target

    AdoptionApiService.postPeople(name.value)
      .then(res => {
        name.value=''
        this.updateStateName(res)
        this.updateStateQueue([...this.state.queue, res])
      })
    this.startQueueUpdate()
  }

  updateStateName = name => {
    console.log('updateStateName', name)
    this.setState({
      name: name,
    })
  }

  updateStateAnimals = animals => {
    this.setState({
      cat: animals.nextCat,
      dog: animals.nextDog,
    })
  }

  updateStateQueue = queue => {
    console.log(queue)
    this.setState({
      queue: queue,
    })
  }

  renderQueue = () => {
    console.log('render queue', this.state.queue)
    return(
      this.state.queue.map(person => 
        <Queue 
          name = {person}
        />
      )
    )
  }

  renderAnimals = () => {
    return(
      <div className='animalDiv'>
        <Animals className='dog'
          picture = {this.state.cat.imageURL}
          description = {this.state.cat.description}
          name = {this.state.cat.name}
          gender = {this.state.cat.gender}
          breed = {this.state.cat.breed}
          story = {this.state.cat.story}
        />
        <Animals className='cat'
          picture = {this.state.dog.imageURL}
          description = {this.state.dog.description}
          name = {this.state.dog.name}
          gender = {this.state.dog.gender}
          breed = {this.state.dog.breed}
          story = {this.state.dog.story}
        />
      </div>
    )
  } 

  render() {
    return (
      <div>
        <h1 className='title'>FIFO Pet Adoption</h1>
        <div>
          <h2>Current Animals Up for Adoption:</h2>
          <div>
            {this.renderAnimals()}
          </div>
          {this.state.name === this.state.queue[0] &&
          <div>
            <h2>Select the animals you want to Adopt</h2>
            <button onClick={this.handleAdoptCat}>I want the Cat</button>
            <button onClick={this.handleAdoptDog}>I want the Dog</button>
            <button onClick={this.handleAdoptBoth}>I want Both</button>
            <button onClick={this.handleAdoptNone}>I don't want either</button>
          </div>
          }
          {this.state.message !== '' &&
          <div>
            <span>{this.state.message}</span>
            <button onClick={this.hanldeContinue}>Continue</button>
          </div>
          }
        </div>
        {this.state.name === '' &&
        <div className='form'>
          <h2>Enter the Adoption Queue </h2>
          <form className='queueForm' onSubmit={this.handleFormSubmit}>
            <label htmlFor='name'> Name:</label>
            <input className='name' name='name' id='name' type='text'></input>
            <button type='submit' className='submitButton'>Submit</button>
          </form>
        </div>
        }
        <div>
          <h2>Current Queue:</h2>
          {this.renderQueue()}
        </div>
      </div>
    )
  }
}

//
