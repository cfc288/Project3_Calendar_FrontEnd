import React, { Component } from 'react';
import moment from 'moment';
import './day.css';
// import DayPicker from 'react-day-picker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { DateUtils } from 'react-day-picker';
// import dateFnsFormat from 'date-fns/format';
// import dateFnsParse from 'date-fns/parse';





let baseUrl = 'http://localhost:3003';


export default class Day extends React.Component {
      

    constructor(props) {
        super(props);

        this.state = {
          showModal: false,
          availAppts: [],
          
        }
        //selectedDay: this.props.selectedDay
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    

    getAvailAppts = () => {
      // fetch to the backend
      fetch(baseUrl + "/availAppt",{
        credentials: "include"
      })
      .then(res => {
        if(res.status === 200) {
          return res.json()
        } else {
          return []
        }
      }).then(data => {
        console.log(data)
        this.setState({ availAppt: data })
      })
    }


    toggleCelebrated = (availAppt) => {
     console.log(availAppt)
      // fetch(baseUrl + '/availAppt/' + appt._id, {
      //   method: 'PUT',
      //   body: JSON.stringify({celebrated: !appts.celebrated}),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   credentials: "include"
      // }).then(res => res.json())
      // .then(resJson => {
      //   // console.log(resJson)
      //   const copyAvailAppts = [...this.state.availAppts]
      //   const findIndex = this.state.availAppts.findIndex(
      //     appt => appt._id === resJson._id)
      //   copyAvailAppts[findIndex].celebrated = resJson.celebrated
      //   this.setState({
      //     appointments: copyAvailAppts
      //   })
      // })
    }
  

  
    render () {

      let dayForAppts = this.props.dateSelected
      console.log('before:', dayForAppts)
      dayForAppts = dayForAppts.toLocaleDateString();
      console.log('after:', dayForAppts)

    return (
      <div>
        <p> Available time slots for {dayForAppts} </p>
        
        
      </div>
    );}
}





// <div>
//             <table>
//                 <tbody>
//                     { 
//                     this.props.bookmarks.map((bookmark, i) => {
//                         return (

//                         <tr key={i}>
//                             <td onDoubleClick={() => this.toggleCelebrated(holiday)}
//                             className={ holiday.celebrated ? 'celebrated' : null }>
//                             { holiday.name }
//                             </td>

//                             <td> {availAppt.time} </td>
                            
//                             <td> {bookmark.description} </td>


//                             <td onClick={() => this.props.deleteBookmark(bookmark._id)}>(DELETE)
//                             </td> 

//                             <td onClick={() => {this.showEditForm(bookmark)} } onChange={this.handleChange}>  Show Edit Form
                           
//                             {
//                                 this.state.modalOpen 

//                                 &&
//                                 <div>
//                                 <form onSubmit={(e)=>{ this.props.handleSubmit(e, bookmark._id, this.state.updatedTitle, this.state.updatedUrl, this.state.updatedDes)} }>

//                                 <label>Title: </label>
//                                 <input type='text' id='title' name="updatedTitle"  onChange={this.handleChange} />

//                                 <label>Description: </label>
//                                 <input type='text' id='title' name="updatedDes"  onChange={this.handleChange} />

                            
//                                 <label>Url: </label>
//                                 <input type='text' id='title' name="updatedUrl"  onChange={this.handleChange} />


//                                 <input type="submit" value="Edit" />

//                                 </form>
//                                 </div>
                                
//                             }
                            
//                             </td>
//                         </tr>
                         
//                     )})
                    
//                         }
//                 </tbody>
//             </table>
//             <button onClick={this.closeModal} > Close Form</button>
//         </div>