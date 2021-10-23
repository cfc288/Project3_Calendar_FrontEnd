import './App.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Calendar from "./Calendar";

let baseUrl = 'http://localhost:3003';

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
      modalOpen: false,
      userLoggedIn: false,
      admin: false,
    }
  }





// loginUser = async (e) => {
//     console.log('loginUser')
//     e.preventDefault()
//     const url = baseUrl + '/users/login'
//     const loginBody = {
//       username: e.target.username.value,
//       password: e.target.password.value
//     }
//     try {

//       const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify(loginBody),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: "include"
//       })

//       console.log(response)
//       console.log("BODY: ",response.body)

//       if (response.status === 200) {
//         this.getAppointment()
//       }
//     }
//     catch (err) {
//       console.log('Error => ', err);
//     }
//   }

//   register = async (e) => {
//     e.preventDefault()
//     const url = baseUrl + '/users/signup'
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//           username: e.target.username.value,
//           password: e.target.password.value
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       if (response.status === 200) {
//         this.getAppointment()
//       }
//     }
//     catch (err) {
//       console.log('Error => ', err);
//     }
//   }

render() {
  return (
    <div>
      <Calendar />
      <h1>TEST</h1>
    </div>
  );
}
}

export default App;
