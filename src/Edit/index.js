import React, { Component } from 'react'
import './edit.css'
import img6 from "../img/editShop.jpeg"
import img7 from "../img/sign.png"
import ReactModal from 'react-modal'

const modalStyle = {
  backgroundImage:"url(" + img6 + ")",
}

const modalStyle2 = {
  backgroundImage:"url(" + img7 + ")",
}

let baseUrl = process.env.REACT_APP_BASEURL

export default class Edit extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
      // apptTime: this.props.time,
      // apptDate: props.date,
      fullName: this.props.appointmentToBeEdited.fullName,
      phone: this.props.appointmentToBeEdited.phone,
      email: this.props.appointmentToBeEdited.email,
      showModal: false,
      appointmentToBeEdited: this.props.appointmentToBeEdited,
      id: null
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
      //console.log('appointmentToBeEdited: ', appointmentToBeEdited)
        this.setState({
         showModal: true,
          // fullName: this.state.appointmentToBeEdited.fullName,
          // phone: this.state.appointmentToBeEdited.phone,
          // email: this.state.appointmentToBeEdited.email,
          // id: this.state.appointmentToBeEdited._id
        })
        console.log('aTBD:', this.state.appointmentToBeEdited)
      }
      

      deleteAppt = (id) => {
        // console.log(id)
        fetch(baseUrl + '/appointments/' + id, {
        method: 'DELETE',
        //credentials: "include"
          }).then( res => {
            // console.log(res)
            // const findIndex = this.state.appointments.findIndex(appointment => appointment._id === id)
            // const copyAppt = [...this.state.appointments]
            // copyAppt.splice(findIndex, 1)
            this.setState({
              showModal: false
              //go back to home page
            })
            this.props.toggleAvail(this.props.dayId, this.props.slot)
            this.props.closeAll()
          })
      }


      

    handleCloseModal = () => {
      this.setState({ showModal: false }) 
      //alert('appointment Scheduled!')
      
      }


    //puts all appointments in an array to delete
      getAppts = () => {
        // fetch to the backend
        //fetch is built into react
        fetch(baseUrl + "/appointments"
        ,
        // {
        //  credentials: "include"
        // }
        )
        //then we get a response from the database?
        .then(res => {
          if(res.status === 200) {
            return res.json()
          } else {
            return []
          }
        }).then(data => {
          //console log to make sure we are getting data first
          console.log(data)
          this.setState({ appointments: data })
    
        })
    
      }

    

      
     

    handleSubmitEdit = async (e, updatedName, updatedPhone, updatedEmail) => {
        e.preventDefault()
        
       // console.log("handleSubmit", appointmentToBeEdited, updatedName, updatedPhone, updatedEmail)
       
        try{
           const url = baseUrl + '/appointments/' + this.props.appointmentToBeEdited._id
           const response = await fetch( url , {
             method: 'PUT',
             body: JSON.stringify({
               fullName: updatedName,
               phone: updatedPhone,
               email: updatedEmail
             }),
             headers: {
               'Content-Type' : 'application/json'
             },
         //   credentials: "include"
           })
           console.log(response)
           if (response.status === 200){
             const updatedAppt = await response.json()
             console.log('updatedAppt: ', updatedAppt)
             //const findIndex = this.state.appointmentToBeEdited.findIndex(appointmentToBeEdited => appointmentToBeEdited._id === updatedAppt._id)
             //const copyAppt = [...this.state.appointmentToBeEdited]
             //copyAppt[findIndex] = updatedAppt
             this.setState({
              //appointmentToBeEdited: copyAppt,
              fullName: updatedAppt.fullName,
              email: updatedAppt.email,
              phone: updatedAppt.phone,
              modalOpen:false
             })
           }
         }
         catch(err){
           console.log('Error => ', err);
         }
         this.props.closeAll()
       }



  componentDidMount() {
    this.getAppts()
    console.log('aTBD:', this.state.appointmentToBeEdited)
  }


render() {
    return (
        <div>
        <div className="editModal" style={modalStyle}>
            <table>
                <tbody>
                    { 
                        <tr >

                            <br /><tr>Name: {this.state.fullName} </tr><br />
                            
                            <tr>Email: {this.state.email} </tr><br />

                            <tr>Phone: {this.state.phone} </tr><br />

                            <tr >
                              <button className="editFormButton" onClick={() => this.deleteAppt(this.state.appointmentToBeEdited._id)}>(DELETE)</button>
                            </tr><br /> 

                            <tr> <button className="editFormButton" onClick={() => {this.showEditForm()} } onChange={this.handleChange}>  Change info for Appointment </button> 
                            <br />
                           
                            <ReactModal
                              isOpen={this.state.showModal}>
                                <div>
                                  
                                <div className="editModal2" style={modalStyle2}>
                                
                                <form onSubmit={(e)=>{ this.handleSubmitEdit(e, this.state.updatedName, this.state.updatedPhone, this.state.updatedEmail)} }>


                                <div className="editModal" style={modalStyle}>
                                <table> 
                                  <tbody>
                                    <tr>Is this information correct?</tr>
                                    <br />
                                  <tr>Name: {this.state.fullName} </tr><br />
                                                            
                                  <tr>Email: {this.state.email} </tr><br />

                                  <tr>Phone: {this.state.phone} </tr><br />
                                  </tbody>
                                </table>


                                <br /><label>Name: </label>
                                <input type='text' id='fullName' name="updatedName"  onChange={this.handleChange} /><br />

                               <br /><label>Phone: </label>
                                <input type='text' id='phone' name="updatedPhone"  onChange={this.handleChange} /><br />

                            
                                <br /><label>Email: </label>
                                <input type='text' id='email' name="updatedEmail"  onChange={this.handleChange} /><br />


                                <br />
                                <input className="editFormButton" type="submit" value="Edit" />

                                </div>
                                </form>

                                </div>
                                </div>
                              </ReactModal>
                            
                            </tr>
                        </tr>
                         
                    }
                    
                        
                </tbody>
            </table>
           
        </div>
        </div>
    )}
}