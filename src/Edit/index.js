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

let baseUrl = 'http://localhost:3003';

export default class Edit extends React.Component {
    constructor(props) {
    super(props)

    this.state = {
      apptTime: props.time,
      apptDate: props.date,
      fullName: props.fullName,
      phone: props.phone,
      email: props.email,
      showModal: false,
      appointmentToBeEdited: props.createdData,
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
        this.setState({
         showModal: true,
          fullName: this.state.appointmentToBeEdited.fullName,
          phone: this.state.appointmentToBeEdited.phone,
          email: this.state.appointmentToBeEdited.email,
          id: this.state.appointmentToBeEdited._id
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
            const findIndex = this.state.appointments.findIndex(appointment => appointment._id === id)
            const copyAppt = [...this.state.appointments]
            copyAppt.splice(findIndex, 1)
            this.setState({
              appointments: copyAppt
              //go back to home page
            })
          })
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

      
     

    handleSubmitEdit = async (e, appointmentToBeEdited, updatedName, updatedPhone, updatedEmail) => {
        e.preventDefault()
        
        console.log("handleSubmit", appointmentToBeEdited, updatedName, updatedPhone, updatedEmail)
       
        try{
           const url = baseUrl + '/appointments/' + appointmentToBeEdited
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
             const findIndex = this.state.appointmentToBeEdited.findIndex(appointmentToBeEdited => appointmentToBeEdited._id === updatedAppt._id)
             const copyAppt = [...this.state.appointmentToBeEdited]
             copyAppt[findIndex] = updatedAppt
             this.setState({
               appointmentToBeEdited: copyAppt,
            //    modalOpen:false
             })
           }
         }
         catch(err){
           console.log('Error => ', err);
         }
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
                            
                            <br /><tr>Email: {this.state.email} </tr><br />

                            <br /><tr>Phone: {this.state.phone} </tr><br />

                            <br /><tr onClick={() => this.deleteAppt(this.state.appointmentToBeEdited._id)}>(DELETE)
                            </tr><br /> 

                            <br /><tr onClick={() => {this.showEditForm()} } onChange={this.handleChange}>  Show Edit Form<br />
                           
                            <ReactModal
                              isOpen={this.state.showModal}>
                                <div>
                                <div className="editModal2" style={modalStyle2}>
                                <form onSubmit={(e)=>{ this.handleSubmit(e, this.state.appointmentToBeEdited, this.state.updatedName, this.state.updatedPhone, this.state.updatedEmail)} }>

                                <br /><label>Name: </label>
                                <input type='text' id='fullName' name="updatedName"  onChange={this.handleChange} /><br />

                               <br /><label>Phone: </label>
                                <input type='text' id='phone' name="updatedPhone"  onChange={this.handleChange} /><br />

                            
                                <br /><label>Email: </label>
                                <input type='text' id='email' name="updatedEmail"  onChange={this.handleChange} /><br />


                                <br /><input className="editFormButton" type="submit" value="Edit" />

                                </form>
                                </div>
                                </div>
                              </ReactModal>
                            
                            </tr>
                        </tr>
                         
                    }
                    
                        
                </tbody>
            </table>
           <button className="closeFormButton" onClick={this.closeModal} > Close Form</button>
        </div>
        </div>
    )}
}