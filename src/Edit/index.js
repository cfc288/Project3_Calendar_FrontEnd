import React, { Component } from 'react'
import './edit.css'


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
            appointmentToBeEdited: null,
            appointments: []

		}
	}


    handleChange = (e) => {
		// console.log('event.target.value',e.target.value)
		// console.log('event.target.name',e.target.name)
		this.setState({
			[e.target.name]: e.target.value
		
		})
	}
 
    showEditForm = (appointment)=> {
        this.setState({
          modalOpen:true,
          fullName: appointment.title,
          phone: appointment.phone,
          email: appointment.email,
          appointmentToBeEdited: appointment
        })
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
             const findIndex = this.state.appointments.findIndex(appointment => appointment._id === updatedAppt._id)
             const copyAppt = [...this.state.appointments]
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
  }


render() {
    return (
        <div>
            <table>
                <tbody>
                    { 
                        <tr >

                            <td> {this.state.fullName} </td>
                            
                            <td> {this.state.email} </td>

                            <td> {this.state.phone} </td>

                            <td onClick={() => this.deleteAppt(this.state.appointmentToBeEdited._id)}>(DELETE)
                            </td> 

                            <td onClick={() => {this.showEditForm(this.state.appointmentToBeEdited)} } onChange={this.handleChange}>  Show Edit Form
                           
                            {
                                this.state.modalOpen 

                                &&
                                <div>
                                <form onSubmit={(e)=>{ this.handleSubmit(e, this.state.appointmentToBeEdited._id, this.state.updatedName, this.state.updatedPhone, this.state.updatedEmail)} }>

                                <label>Name: </label>
                                <input type='text' id='fullName' name="updatedName"  onChange={this.handleChange} />

                                <label>Phone: </label>
                                <input type='text' id='phone' name="updatedPhone"  onChange={this.handleChange} />

                            
                                <label>Email: </label>
                                <input type='text' id='email' name="updatedEmail"  onChange={this.handleChange} />


                                <input type="submit" value="Edit" />

                                </form>
                                </div>
                                
                            }
                            
                            </td>
                        </tr>
                         
                    }
                    
                        
                </tbody>
            </table>
            <button onClick={this.closeModal} > Close Form</button>
        </div>
        
    )}
}
