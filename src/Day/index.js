import React, { Component } from 'react';
import moment from 'moment';
import './day.css';
import Appointment from '../Appointment'
import ReactModal from 'react-modal';
import Show from '../Show/index'
// import DayPicker from 'react-day-picker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { DateUtils } from 'react-day-picker';
// import dateFnsFormat from 'date-fns/format';
// import dateFnsParse from 'date-fns/parse';
import img5 from "../img/tattooAction.jpeg"


const modalStyle = {
  backgroundImage:"url(" + img5 + ")",
}


let baseUrl = process.env.REACT_APP_BASEURL
//'https://proj3-calendar-frontend.herokuapp.com/;'


export default class Day extends React.Component {
      

    constructor(props) {
        super(props);

        this.state = {
          showModal: false,
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
          
        };
        //selectedDay: this.props.selectedDay
        // this.handleOpenModal = this.handleOpenModal.bind(this);
       //this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    
    // handleCloseModal = () => {
    //   this.setState({ showModal: false }); 
    // }
    handleOpenModalOne = (id) => {
      this.setState({ showModalOne: true
        
      })
    }
    handleOpenModalTwo = (id) => {
      this.setState({ showModalTwo: true     
      })
    }
    handleOpenModalThree = (id) => {
      this.setState({ showModalThree: true        
      })
    }
    handleOpenModalFour = (id) => {
      this.setState({ showModalFour: true        
      })
    }
    handleOpenModalFive = (id) => {
      this.setState({ showModalFive: true        
      })
    }
    handleOpenModalSix = (id) => {
      this.setState({ showModalSix: true        
      })
    }
    handleOpenModalSeven = (id) => {
      this.setState({ showModalSeven: true        
      })
    }
    handleOpenModalEight = (id) => {
      this.setState({ showModalEight: true        
      })
    }

    //__________________________________
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



    handleCloseModal () {
      this.setState({ showModal: false }); 
    }


    handleCloseModal1 = () => {
      this.setState({ showModal1: false})
    }
    handleCloseModal2 = () => {
      this.setState({ showModal2: false})
    }
    handleCloseModal3 = () => {
      this.setState({ showModal3: false})
    }
    handleCloseModal4 = () => {
      this.setState({ showModal4: false})
    }
    handleCloseModal5 = () => {
      this.setState({ showModal5: false})
    }
    handleCloseModal6 = () => {
      this.setState({ showModal6: false})
    }
    handleCloseModal7 = () => {
      this.setState({ showModal7: false})
    }
    handleCloseModal8 = () => {
      this.setState({ showModal8: false})
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

      // console.log('this.state.day(render): ', this.state.day)
      // console.log('this.props.dateSelected(render): ', this.props.dateSelected)
      console.log(this.state.selectedDateI)


      let dayForAppts = this.props.dateSelected
      console.log('before:', dayForAppts)
      dayForAppts = dayForAppts.toLocaleDateString();
      console.log('after:', dayForAppts)
      console.log('this.state.date: ', this.state.date)


    return (
      <div>
      <div className="dayModal" style={modalStyle}>
        <p> Available time slots for {this.state.date} </p>
        
      
        <div className="timeTable">
          <table className="timeSlots">
          
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
                          isOpen={this.state.showModal1} >
                          <Appointment date={this.state.date} time={'9am'} closeAll={this.props.closeAll}/>

                          <button className="backButton" onClick={this.handleCloseModal}> Back (Day)</button>
                      </ReactModal>
                      </td>
                      
                  </tr>
                  <tr >
                  <td onClick={this.handleOpenModalOne}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot1)
                        ? "  "
                        : "Check Appointment Information for 9am"
                      : "refresh your page"
                    }
                       { 
                       (this.state.selectedDateI > -1 ) && 
                       <ReactModal isOpen={this.state.showModalOne}>
                          <Show date={this.state.date} time={'9am'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot1'} closeAll={this.props.closeAll}/> 
                        </ReactModal>
                        }
                      </td>
                    </tr>
                  <tr>
                    







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
                          <Appointment date={this.state.date} time={'10am'} closeAll={this.props.closeAll}/>
                    </ReactModal>
                    </td>
                  </tr>

                  <tr >
                  <td onClick={this.handleOpenModalTwo}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot2)
                        ? "  "
                        : "Check Appointment Information for 10am"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalTwo}>
                          <Show date={this.state.date} time={'10am'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot2'} closeAll={this.props.closeAll} /> 
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
                          <Appointment date={this.state.date} time={'11am'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                  </tr>
                  <tr >
                  <td onClick={this.handleOpenModalThree}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot3)
                        ? "  "
                        : "Check Appointment Information for 11am"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalThree}>
                          <Show date={this.state.date} time={'11am'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot3'} closeAll={this.props.closeAll}/> 
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
                          <Appointment date={this.state.date} time={'1pm'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                  </tr>
                  <tr >
                  <td onClick={this.handleOpenModalFour}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot4)
                        ? "  "
                        : "Check Appointment Information for 1pm"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalFour}>
                          <Show date={this.state.date} time={'1pm'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot4'} closeAll={this.props.closeAll}/> 
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
                          <Appointment date={this.state.date} time={'2pm'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                  </tr>
                  <tr >
                  <td onClick={this.handleOpenModalFive}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot5)
                        ? "  "
                        : "Check Appointment Information for 2pm"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalFive}>
                          <Show date={this.state.date} time={'2pm'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot5'} closeAll={this.props.closeAll}/> 
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
                          <Appointment date={this.state.date} time={'3pm'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                    </tr>
                    <tr >
                  <td onClick={this.handleOpenModalSix}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot6)
                        ? "  "
                        : "Check Appointment Information for 3pm"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalSix}>
                          <Show date={this.state.date} time={'3pm'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot6'} closeAll={this.props.closeAll}/> 
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
                          <Appointment date={this.state.date} time={'4pm'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                    </tr>
                    <tr >
                  <td onClick={this.handleOpenModalSeven}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot7)
                        ? "  "
                        : "Check Appointment Information for 4pm"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalSeven}>
                          <Show date={this.state.date} time={'4pm'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot7'} closeAll={this.props.closeAll}/> 
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
                        <Appointment date={this.state.date} time={'5pm'} closeAll={this.props.closeAll}/>
                      </ReactModal>
                      </td>
                    </tr>
                    <tr >
                  <td onClick={this.handleOpenModalEight}>
                    {
                      (this.state.selectedDateI > -1 )
                      ? (this.state.day[this.state.selectedDateI].availSlot8)
                        ? "  "
                        : "Check Appointment Information for 5pm"
                      : "refresh your page"
                    }
                        <ReactModal isOpen={this.state.showModalEight}>
                          <Show date={this.state.date} time={'5pm'} dayId={this.state.day[this.state.selectedDateI]} toggleAvail={this.toggleAvail} slot={'availSlot8'} closeAll={this.props.closeAll}/> 
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
