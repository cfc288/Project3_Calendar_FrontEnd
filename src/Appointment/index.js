import React, { Component } from 'react'
import './appointment.css'
import img4 from "../img/shop.jpeg"
import ReactModal from 'react-modal';
import Edit from '../Edit/index'

const modalStyle = {
  backgroundImage:"url(" + img4 + ")",
}

let baseUrl = process.env.REACT_APP_BASEURL;
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
			createdData: null,


		}
	}



	handleChange = (e) => {
		// console.log('event.target.value',e.target.value)
		// console.log('event.target.name',e.target.name)
		this.setState({
			[e.target.name]: e.target.value
		
		})
	}


	// handleBoxChange(event) {
	// 	const target = event.target;
	// 	const value = target.type === 'checkbox' ? target.checked : target.value;
	// 	const name = target.name;
	
	// 	this.setState({
	// 	  [name]: value
	// 	});
	//   }


	handleCloseModal = () => {
	this.setState({ showModal: false }); 
	}

//add a pop up on submit
	

	handleSubmit = (e) => {
		e.preventDefault()

		fetch(baseUrl + '/appointments', {
			method: 'POST',
			body: JSON.stringify(
				{apptTime: this.props.time,
				fullName: this.state.fullName, 
				phone: this.state.phone, 
				email: this.state.email}
				),
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(res => res.json()
		).then( createdData => {
			console.log('createdData: ', createdData)
			const copyData = [...this.state.createdAppts]
			copyData.push(createdData)
				//this.props.addAppointment(data)
			this.setState({
				createdAppts: copyData,
				showModal: true,
				createdData: createdData
			})
			console.log('copyData: ',copyData)
			console.log('createdData:', createdData)
		})
	}

	render() {
		console.log('this.state.apptDate insideRender: ' , this.state.apptDate)
		console.log('this.state.apptTime insideRender: ' , this.state.apptTime)
		return(
			<div className="dayModal" style={modalStyle}>
			<div>
			<div >
				<form onSubmit={this.handleSubmit}>
								<br /><label> Appointment Date: {this.props.date} </label><br />
								<br /><label> Appointment Time: {this.props.time} </label><br />

                <br /><label > Full Name: </label>
                <input type='text' id='fullName' name='fullName' onChange={ this.handleChange } /><br />

                <br /><label> Phone: </label>
                <input type='text' id='phone' name='phone' onChange={this.handleChange}/><br />

				<br /><label> Email: </label>
                <input type='text' id='email' name='email' onChange={this.handleChange}/><br />

                <br/> <input className="apptButton" type="submit" value="Add Appointment" />

                
            </form>

			</div>

				<ReactModal 
					isOpen={this.state.showModal}>
						<Edit 
						apptTime={this.state.apptTime}
						apptDate={this.state.apptDate}
						fullName={this.state.fullName}
						phone={this.state.phone}
						email={this.state.email}
						createdData={this.state.createdData}
						/>
				</ReactModal>
			</div>
			<button className="backButton" onClick={this.handleCloseModal} > Select Different Day</button>
			</div> 
			
			)
	}
}


