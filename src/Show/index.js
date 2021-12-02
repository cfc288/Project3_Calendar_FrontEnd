import React, { Component } from 'react'
import './show.css'
import img6 from "../img/editShop.jpeg"
import img7 from "../img/sign.png"
import ReactModal from 'react-modal'
import Edit from '../Edit/index'

const modalStyle = {
  backgroundImage:"url(" + img6 + ")",
}

const modalStyle2 = {
  backgroundImage:"url(" + img7 + ")",
}

let baseUrl = process.env.REACT_APP_BASEURL

export default class Show extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
      apptTime: this.props.time,
      apptDate: this.props.date,
      fullName: '',
      phone: '',
      email: '',
      showModal: false,
    //   appointmentToBeEdited: props.createdData,
      id: null,
      appt:[],
      foundData: null,
      appointmentToBeEdited: props.createdData,

    }
  }


    handleChange = (e) => {
    // console.log('event.target.value',e.target.value)
    // console.log('event.target.name',e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    
    })
  }
 
    showEditForm = ()=> {
        this.setState({
         showModal: true,
        //   fullName: this.state.appointmentToBeEdited.fullName,
        //   phone: this.state.appointmentToBeEdited.phone,
        //   email: this.state.appointmentToBeEdited.email,
        //   id: this.state.appointmentToBeEdited._id
        })
        // console.log('aTBD:', this.state.appointmentToBeEdited)
      }
      

      deleteAppt = (id) => {
        // console.log(id)
        fetch(baseUrl + '/appointments/' + this.props.dayId, {
        method: 'DELETE',
        //credentials: "include"
          }).then( res => {
            // console.log(res)
            const findIndex = this.state.appointments.findIndex(appointment => appointment._id === id)
            const copyAppt = [...this.state.appointments]
            copyAppt.splice(findIndex, 1)
            this.setState({
              appointments: copyAppt,
              showModal: false
              //go back to home page
            })
          })
      }



      //GET ------------------------------------------------------------
      getOneAppt = () => {
        //   e.preventDefault()
          fetch(baseUrl + '/appointments/getAppt',{
            method: 'POST',
              body: JSON.stringify({
                  apptTime: this.state.apptTime,
                  apptDate: this.state.apptDate,
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
          }).then(res => {
              if(res.status === 200) {
                  return res.json()
              } else {
                  return []
              }
          }).then(data => {
            console.log('data in getOneAppt: ', data)
            this.setState({ appt: data.data})
            console.log('this.state.appt in getDay: ', this.state.appt)
          }).then(console.log('this.state.appt outside getOneAppt: ', this.state.appt))
      }



      
      handleCloseModal = () => {
        this.setState({ showModal: false }) 
        //alert('appointment Scheduled!')
        
        }


    // //puts all appointments in an array
    //   getAppts = () => {
    //     // fetch to the backend
    //     //fetch is built into react
    //     fetch(baseUrl + "/appointments"
    //     ,
    //     // {
    //     //  credentials: "include"
    //     // }
    //     )
    //     //then we get a response from the database?
    //     .then(res => {
    //       if(res.status === 200) {
    //         return res.json()
    //       } else {
    //         return []
    //       }
    //     }).then(data => {
    //       //console log to make sure we are getting data first
    //       console.log(data)
    //       this.setState({ appointments: data })
    
    //     })
    
    //   }

      
    handleCloseModal = () => {
        this.setState({ showModal: false }); 
        }

    

    handleCloseModal = () => {
    this.setState({ showModal: false }); 
    }

  componentDidMount() {
    this.getOneAppt()
  }


render() {
    console.log('this.state -Show- ', this.state)
    console.log('this.props:', this.props)
    return (
        <div>
        <div className="editModal" style={modalStyle}>
            <table>
                <tbody>
                    { 
                        <tr >

                            <br />
                            <tr>Date: {this.state.apptDate} 
                            </tr><br />
                            <tr>Time: {this.state.apptTime} 
                            </tr><br />
                            <tr>Name: {this.state.appt.fullName} 
                            </tr><br />
                            <tr>Email: {this.state.appt.email} 
                            </tr><br />
                            <tr>Phone: {this.state.appt.phone} 
                            </tr><br />
                        </tr>

                        
                         
                    }
                    
                        
                </tbody>
            </table>

            <table>
                <tbody>
                <tr> 
                    <button className="editFormButton" onClick={this.showEditForm} >  Change info for Appointment 
                    </button>
                </tr>
                </tbody>
            </table>
           
            <ReactModal 
					isOpen={this.state.showModal}>
						<Edit 
                        appointmentToBeEdited={this.state.appt}
						dayId={this.props.dayId}
                        toggleAvail={this.props.toggleAvail}
                        slot={this.props.slot}
                        closeAll={this.props.closeAll}
                        />

                
				</ReactModal>
                
                <button className="backButton" onClick={this.props.closeAll} > Home (show) </button>

        </div>
        </div>
    )}
}