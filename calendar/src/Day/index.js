import React, { Component } from 'react';
import moment from 'moment';
import './day.css';
import DayPicker from 'react-day-picker';





let baseUrl = 'http://localhost:3003';


export default class Day extends React.Component {
      state = {
        dateContext: moment(),
        today: moment(),
        // showModal: false,
        
      }

    constructor(props) {
        super(props);
        //selectedDay: this.props.selectedDay
        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    


    // weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    
    // weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    // months = moment.months();


    // year = () => {
    //     return this.state.dateContext.format("Y");
    // }

    // month = () => {
    //     return this.state.dateContext.format("MMMM");
    // }
    
  

    // getBookmarks = () => {
    //   // fetch to the backend
    //   //fetch is built into react
    //   fetch(baseUrl + "/bookmarks"
    //   , {
    //    credentials: "include"
    //   })
    //   //then we get a response from the database?
    //   .then(res => {
    //     if(res.status === 200) {
    //       return res.json()
    //     } else {
    //       return []
    //     }
    //   }).then(data => {
    //     //console log to make sure we are getting data first
    //     console.log(data)
    //     this.setState({ bookmarks: data })
  
    //   })
  
    // }

  


  
    render () {
    return (
      <div>
        
        
      </div>
    );
  
    }
}


