import React, { Component } from 'react'

export default class Appointment extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: '',
			lastName: '',
			month: '',
			day: '',
			time: '',
		}
	}

	handleChange = (e) => {
		// console.log('event.target.value',e.target.value)
		// console.log('event.target.name',e.target.name)
		this.setState({
			name: e.target.value
		
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		fetch(this.props.baseUrl + '/', {
			method: 'POST'
			body: JSON.stringify({name: thist.state.name}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then( res => {
			return res.json()
		}).then( data => {
			this.props.addAppointment(data)
			this.setState({
				name: ''
			}).catch (error => console.error({'Error': error}))
		})
	}

	render() {
		return(
			)
	}




}