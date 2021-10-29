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
          day: [],
          date: props.dateSelected.toLocaleDateString(),
          selectedDateI: -1
          
        }
        //selectedDay: this.props.selectedDay
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    


    toggleAvail = (setDay, slot) => {
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
            day: copyDay
          })
        })
    }
  

  addDay = (newDay) => {
    
    console.log('this.state.day[1].dayForAppts in addDay: ', this.state.day[1].dayForAppts)
   
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
        <p> Available time slots for  ..{this.state.date}.. which is {dayForAppts} </p>
        <p> not props {this.state.date}</p>
       
        
        <div>
          <table 
          >
          
            <tbody>
              
                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot1") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot1 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot1)
                            ? " #1 available "
                            : " #1 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot2") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot2 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot2)
                            ? " #2 available "
                            : " #2 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot3") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot3 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot3)
                            ? " #3 available "
                            : " #3 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot4") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot4 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot4)
                            ? " #4 available "
                            : " #4 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot5") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot5 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot5)
                            ? " #5 available "
                            : " #5 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                  <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot6") }}
                     className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot6 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot6)
                            ? " #6 available "
                            : " #6 not available"
                          : "refresh your page"
                      } 
                      </td>

                  </tr>

                  <tr >
                    
                    <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot7") }}
                      className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot7 ? null : 'notAvail' }>
                        {
                            (this.state.selectedDateI > -1 )
                            ? (this.state.day[this.state.selectedDateI].availSlot7)
                              ? " #7 available "
                              : " #7 not available"
                            : "refresh your page"
                        } 
                      </td>

                  </tr>

                  <tr >
                    
                      <td onClick={()=> {this.toggleAvail(this.state.day[this.state.selectedDateI], "availSlot8") }}
                      className={this.state.selectedDateI > -1 && this.state.day[this.state.selectedDateI].availSlot8 ? null : 'notAvail' }>
                      {
                          (this.state.selectedDateI > -1 )
                          ? (this.state.day[this.state.selectedDateI].availSlot8)
                            ? " #8 available "
                            : " #8 not available"
                          : "refresh your page"
                      }
                      </td>

                  </tr>

                  <tr >
                    
                      <td>

                      </td>

                  </tr>
                
            </tbody>
          

           
        </table>
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