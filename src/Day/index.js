import React, { Component } from 'react';
import moment from 'moment';
import './day.css';
import Appointment from '../Appointment'
import ReactModal from 'react-modal';
// import DayPicker from 'react-day-picker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { DateUtils } from 'react-day-picker';
// import dateFnsFormat from 'date-fns/format';
// import dateFnsParse from 'date-fns/parse';
import img5 from "../img/tattooAction.jpeg"

const modalStyle = {
  backgroundImage:"url(" + img5 + ")",
}


let baseUrl = 'http://localhost:3003';
//'https://proj3-calendar-frontend.herokuapp.com/;'


export default class Day extends React.Component {
      

    constructor(props) {
        super(props);

        this.state = {
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: false,
          showModal5: false,
          showModal6: false,
          showModal7: false,
          showModal8: false,

          day: [],
          date: props.dateSelected.toLocaleDateString(),
          selectedDateI: -1,
          time: '',
          
        }
        //selectedDay: this.props.selectedDay
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    
    // handleCloseModal = () => {
    //   this.setState({ showModal: false }); 
    // }

    handleOpenModal1 = () => {
      this.setState({ showModal1: true})
    }
    handleOpenModal2 = () => {
      this.setState({ showModal2: true})
    }
    handleOpenModal3 = () => {
      this.setState({ showModal3: true})
    }
    handleOpenModal4 = () => {
      this.setState({ showModal4: true})
    }
    handleOpenModal5 = () => {
      this.setState({ showModal5: true})
    }
    handleOpenModal6 = () => {
      this.setState({ showModal6: true})
    }
    handleOpenModal7 = () => {
      this.setState({ showModal7: true})
    }
    handleOpenModal8 = () => {
      this.setState({ showModal8: true})
    }



    toggleAvail = (setDay, slot ) => {
      console.log()
        fetch(baseUrl + '/availAppt/' + setDay._id, {
          method: 'PUT',
          body: JSON.stringify({[slot] : !setDay[slot]}),
          headers: {
            'Content-Type': 'application/json'
          },
          // credentials: "include"
        }).then(res => res.json())
        .then(resJson => {
          // console.log(resJson)
          const copyDay = [...this.state.day]
          const findIndex = this.state.day.findIndex(
            day => day._id === resJson._id)
            //checks copy against resJson{which = updated data} 
          copyDay[findIndex] = resJson
          this.setState({
            //once updated set new array to "current array" in use (aka day)
            day: copyDay,
            
            
          })
        })
    }
  

  addDay = (newDay) => {
    
    // console.log('this.state.day[1].dayForAppts in addDay: ', this.state.day[1].dayForAppts)
   
    console.log('addDay') 
    
    fetch(baseUrl + '/availAppt', {
    method: 'POST',
    body: JSON.stringify({
      dayForAppts: newDay
    }),
    headers: {
      'Content-Type' : 'application/json'
    },
    // credentials: "include"
    }).then( res => res.json())
    .then(createdDate => {
      const copyDay = [...this.state.day]
      copyDay.push(createdDate)
      this.setState({
        day: copyDay,
        selectedDateI: copyDay.length - 1
      })
    })
  }
    

  checkingDay = () => {
    // console.log('checkingDay')
    // console.log('this.state.day in checkingDay: ', typeof this.state.day)
    //  console.log('this.state.day[1].dayForAppts in checkingDay: ', typeof this.state.day[1].dayForAppts)
    // console.log('this.state.date in checkingDay', typeof this.state.date)
    const dayDoesExistInDB = this.state.day.some((dateObj)=> {
      return dateObj.dayForAppts === this.state.date
    })
    console.log('dayDoesExist', dayDoesExistInDB)

    // this.state.day.forEach((checkDay) => {  
    //   console.log('this.state.date in checkday: ', this.state.date)
    //     console.log('checkday.dayForAppts: ',  checkDay.dayForAppts)

      if (dayDoesExistInDB) { 
          //console.log('all good')
          const foundIndex = this.state.day.findIndex((dayObj)=> {
            return dayObj.dayForAppts === this.state.date 
          })
          this.setState({ 
            selectedDateI: foundIndex
          })
      } else {
        console.log('addDay')
        this.addDay(this.state.date)
      } 
    }
   



  getDay = () => {
    console.log('getDay')
    // fetch to the backend
    fetch(baseUrl + "/availAppt", 
    // {
    //   credentials: "include"
    // }
    )
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      console.log('data in getDay: ', data)
      this.setState({ day: data })
      console.log('this.state.day in getDay: ', this.state.day)
      this.checkingDay()
    }).then(console.log('this.state.day outside getDay: ', this.state.day))
  }




  componentDidMount() {
    console.log('componentDidMount')
    this.getDay()
  }


  
    render () {


      // console.log('this.date: ', this.date)
      console.log('this.props: ', this.props.dateSelected.toLocaleDateString())
      let dayForAppts = this.props.dateSelected
      console.log('before:', dayForAppts)
      dayForAppts = dayForAppts.toLocaleDateString();
      console.log('after:', dayForAppts)
      console.log('this.state.date: ', this.state.date)


    return (
      <div>
      <div className="dayModal" style={modalStyle}>
        <p> Available time slots for {this.state.date} </p>
        
      
        <div>
          <table >
          
            <tbody>
              
                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot1" , 1); this.handleOpenModal1();}}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot1 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot1)
                            ? " 9am - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                      
                      <ReactModal 
                          isOpen={this.state.showModal1}>
                          <Appointment date={this.state.date} time={'9am'}/>
                      </ReactModal>
                      </td>
                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot2"); this.handleOpenModal2(); }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot2 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot2)
                            ? " 10am - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                   <ReactModal 
                          isOpen={this.state.showModal2}>
                          <Appointment date={this.state.date} time={'10am'}/>
                    </ReactModal>
                    </td>
                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot3"); this.handleOpenModal3(); }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot3 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot3)
                            ? " 11am - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                      <ReactModal 
                          isOpen={this.state.showModal3}>
                          <Appointment date={this.state.date} time={'11am'}/>
                      </ReactModal>
                      </td>
                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot4"); this.handleOpenModal4(); }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot4 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot4)
                            ? " 1pm - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                      <ReactModal 
                          isOpen={this.state.showModal4}>
                          <Appointment date={this.state.date} time={'1pm'}/>
                      </ReactModal>
                      </td>
                  </tr>

                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot5"); this.handleOpenModal5(); }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot5 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot5)
                            ? " 2pm - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                      <ReactModal 
                          isOpen={this.state.showModal5}>
                          <Appointment date={this.state.date} time={'2pm'}/>
                      </ReactModal>
                      </td>
                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot6"); this.handleOpenModal6();}}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot6 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot6)
                            ? " 3pm - available "
                            : "time not available"
                          : "refresh your page"
                      } 
                      <ReactModal 
                          isOpen={this.state.showModal6}>
                          <Appointment date={this.state.date} time={'3pm'}/>
                      </ReactModal>
                      </td>
                    </tr>

                  <tr >
                    
                    <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot7"); this.handleOpenModal7(); }}
                      className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot7 ? null : 'notAvail' }>
                        {
                            (this.state.selectedDateI > -1 )
                            ? (this.state.day[this.state.selectedDateI].availSlot7)
                              ? " 4pm - available "
                              : "time not available"
                            : "refresh your page"
                        } 
                      <ReactModal 
                          isOpen={this.state.showModal7}>
                          <Appointment date={this.state.date} time={'4pm'}/>
                      </ReactModal>
                      </td>
                    </tr>

                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot8"); this.handleOpenModal8(); }}
                      className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot8 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot8)
                            ? " 5pm - available "
                            : "time not available"
                          : "refresh your page"
                      }

                      <ReactModal 
                        isOpen={this.state.showModal8}>
                        <Appointment date={this.state.date} time={'5pm'}/>
                      </ReactModal>
                      </td>
                    </tr>
            </tbody>
          

           
        </table>

              </div>

            <div>
          
          </div>
        </div>
      </div>
    );}
}




//<td onDoubleClick={() => this.toggleCelebrated(holiday)}
//                             className={ holiday.celebrated ? 'celebrated' : null }>
//                             { holiday.name }
//                             </td>





// <div>
//             <table>
//                 <tbody>
//                     { 
//                     this.props.bookmarks.map((bookmark, i) => {
//                         return (

//                         <tr key={i}>
//                            

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