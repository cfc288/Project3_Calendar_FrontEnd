import './App.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Calendar from "./Calendar";
import Day from "./Day";
import ReactModal from 'react-modal';



let baseUrl = 'http://localhost:3003';

const style = {
  position: "relative",
  margin: "50px auto"
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',
      time: '',
      showModal: false,
      userLoggedIn: false,
      admin: false,
    }

} 






 onDayClick1 = (e, day) => {
   console.log('appjs onDayClick')
   
  }



loginUser = async (e) => {
    console.log('loginUser')
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const loginBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })

      console.log(response)
      console.log("BODY: ",response.body)

      if (response.status === 200) {
        this.getAppointment()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  register = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        this.getAppointment()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }

  // <Day onDayClick1={this.onDayClick1} handleOpenModal={this.handleOpenModal}/>

  render() {
    return (
      <div className="App">
        <Calendar style={style} width="302px" 
          onDayClick1={(e, day)=> this.onDayClick1(e, day)} handleOpenModal={this.handleOpenModal}/>  


      </div>
    );
  }
}

export default App;
