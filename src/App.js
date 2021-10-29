import './App.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
// import Calendar from "./Calendar";
// import Day from "./Day";
import ReactModal from 'react-modal';
// import DayPicker from 'react-day-picker';
import Calendar from "./DayPicker"
import img from "./img/tatgun1.png"
import img2 from "./img/tatgun2.png"
import img3 from "./img/shop2.png"

const modalStyle = {
  backgroundImage:"url(" + img3 + ")",
}

let baseUrl = 'https://proj3-calendar-frontend.herokuapp.com/;'
// 'http://localhost:3003';


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

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

} 


handleOpenModal () {
  this.setState({ showModal: true });
}
handleCloseModal () {
  this.setState({ showModal: false });
}


//  onDayClick1 = (e, day) => {
//    console.log('appjs onDayClick')
   
// }



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
      <div className="App">
        
        <div className="Title">
          <h1>
          <img class="tattooGun" src={img2}></img>
          React Trio Tattoos
          <img class="tattooGun" src={img}></img>
          </h1>
          <div className="aboutUsModal">
            <div id="aboutUs" onClick={this.handleOpenModal}>About Us</div>
               <div className="modalAbout">
                <ReactModal 
                   isOpen={this.state.showModal}>
                   <div className="insideAboutModal" style={modalStyle}>

                   <h2 className="aboutUsHead">Welcome to React Trio Tattoos!</h2>
                  <p className="aboutUsPar1">We thank you for your interest in our artwork and getting tattooed. Our artist is experienced and can assist with tattooing, whether it's your first tattoo or already have several, and can also assist with solutions for bad tattoos. </p>

                   <p className="aboutUsPar2"> Our goal is to provide you with a professional artistic tattoo within our sterilized and comfortable environment. We want you to feel welcome and relaxed, while also providing humor and positive atmosphere for an enjoyable experience.</p>

                    <p className="aboutUsPar3"> Feel free to give us a call or use our calendar to schedule an appointment for a memorable experience in creating a lifetime memory!</p>

                  <button className="aboutButton" onClick={this.handleCloseModal}>Home</button>
                    </div>
                </ReactModal>
              </div>
            </div>
        </div>
        
        <div className="App">
        <Calendar 
          onDayClick1={(e, day)=> this.onDayClick1(e, day)}/>  
        
        </div>   

      </div>
    );
  }
}

export default App;


//style={style} width="302px" 