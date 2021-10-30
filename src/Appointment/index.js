import React, { Component } from 'react'
import './appointment.css'
import img4 from "../img/shop.jpeg"

const modalStyle = {
  backgroundImage:"url(" + img4 + ")",
}

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
			<div className="dayModal" style={modalStyle}>
				<form onSubmit={this.handleSubmit}>
								<br /><label> Appointment Date: {this.props.date} </label><br />
								<br /><label> Appointment Time: {this.props.time} </label><br />

                <br /><label > Full Name: </label>
                <input type='text' id='fullName' name='fullName' onChange={ this.handleChange } 
                /><br />

                <br /><label> Phone: </label>
                <input type='text' id='phone' name='phone' onChange={this.handleChange}/><br />

								<br /><label> Email: </label>
                <input type='text' id='email' name='phone' onChange={this.handleChange}/><br />

                <br/ ><input className="apptButton" type="submit" value="Add Appointment" />
                <button className="backButton" onClick={this.handleCloseModal}>Select New Day</button>
            </form>
				</div>
			</div>
			)
	}




}






// <label> over18: </label>
// <input type='checkbox' id='over18' name='over18' onChange={this.handleChange}/>

// <tr key={i}>

// <td> {bookmark.apptDate} </td>
// <td> {bookmark.apptTime} </td>
// <td> {bookmark.fullName} </td>
// <td> {bookmark.phone} </td>
// <td> {bookmark.email} </td>

// </tr>


// 	<tr>
// 		<td onClick={() => {this.showEditForm(bookmark)} } onChange={this.handleChange}>  Change details on form
// 		{
// 			this.state.modalOpen 

// 			&&
// 			<div>
// 			<form onSubmit={(e)=>{ this.props.handleSubmit(e, 
// 				bookmark._id, 
// 				this.state.updatedapptDate, this.state.updatedApptTime, 
// 				this.state.updatedName,
// 				this.state.updatedPhone
// 				this.state.updatedEmail)} }>

// 			<label>Title: </label>
// 			<input type='text' id='title' name="updatedTitle"  onChange={this.handleChange} />

// 			<label>Description: </label>
// 			<input type='text' id='title' name="updatedDes"  onChange={this.handleChange} />


// 			<label>Url: </label>
// 			<input type='text' id='title' name="updatedUrl"  onChange={this.handleChange} />


// 			<input type="submit" value="Edit" />

// 			</form>
// 			</div>
	
// 		}
// 		</td>
// </tr>
                         
//                     )})
                    
//                         }
//                 </tbody>
//             </table>
//             <button onClick={this.closeModal} > Close Form</button>
//         </div>
        
//     )}