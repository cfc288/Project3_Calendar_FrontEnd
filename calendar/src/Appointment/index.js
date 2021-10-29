import React, { Component } from 'react'


let baseUrl = 'http://localhost:3003';
//'https://proj3-calendar-frontend.herokuapp.com/;'

export default class Appointment extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			apptTime: props.time,
			apptDate: props.date,
			fullName:'',
			phone: '',
			email: '',
			over18: false,
			showModal: false,
			createdAppts: [],


		}
		this.handleChange = this.handleChange.bind(this);
	}



	// handleChange = (e) => {
	// 	// console.log('event.target.value',e.target.value)
	// 	// console.log('event.target.name',e.target.name)
	// 	this.setState({
	// 		[e.target.name]: e.target.value
		
	// 	})
	// }


	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		this.setState({
		  [name]: value
		});
	  }


	  handleCloseModal = () => {
		this.setState({ showModal: false }); 
	  }

//add a pop up on submit
	

	handleSubmit = () => {
		// e.preventDefault()

		fetch(baseUrl + '/appointments', {
			method: 'POST',
			body: JSON.stringify({fullName: this.state.fullName, phone: this.state.phone, email: this.state.email}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then (response => {
            return response.json()
		})
		.then( data => {

			const copyData = [...this.state.createdAppts]
			copyData.push(data)
				//this.props.addAppointment(data)
			this.setState({
				appttime: '',
				apptDate: '',
				fullName:'',
				phone: '',
				email: '',
			}).catch (error => console.error({'Error': error}))
		})
	}

	render() {
		console.log('this.state.apptDate insideRender: ' , this.state.apptDate)
		console.log('this.state.apptTime insideRender: ' , this.state.apptTime)
		return(
			<div>
				<form onSubmit={this.handleSubmit}>

				<label> appt date appt time</label>

                <label > fullName: </label>
                <input type='text' id='fullName' name='fullName' onChange={ this.handleChange } 
                />

                <label> phone: </label>
                <input type='text' id='phone' name='phone' onChange={this.handleChange}/>

				<label> email: </label>
                <input type='text' id='email' name='phone' onChange={this.handleChange}/>

               

                <input type="submit" value="Add Appointment" />
            </form>
			
			</div>
			)
	}




}






// <label> over18: </label>
// <input type='checkbox' id='over18' name='over18' onChange={this.handleChange}/>