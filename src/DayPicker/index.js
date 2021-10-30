
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import ReactModal from 'react-modal';
import Day from '../Day/index' 


// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { DateUtils } from 'react-day-picker';
// import dateFnsFormat from 'date-fns/format';
// import dateFnsParse from 'date-fns/parse';




// function parseDate(str, format, locale) {
//   const parsed = dateFnsParse(str, format, new Date(), { locale });
//   if (DateUtils.isDate(parsed)) {
//     return parsed;
//   }
//   return undefined;
// }

// function formatDate(date, format, locale) {
//   return dateFnsFormat(date, format, { locale });
// }

// const FORMAT = 'MM/dd/yyyy';




export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    
    this.state = {
      selectedDay: undefined,
      showModal: false,

    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }



 

  handleDayClick(day) {
    this.setState({ 
      selectedDay: day,
    //  dateSelected: day,
       
    });
    this.handleOpenModal();
    console.log('handleClick day: ',day)
    
   // this.props.onDayClick1 && this.props.onDayClick1(e, day);
   
  }

  handleOpenModal (day) {
    this.setState({showModal: true });
    
  }


  handleCloseModal () {
    this.setState({ showModal: false }); 
  }
  

  render() {
    console.log('inside render: ', this.state)
    

    return (
      <div>
         
        <DayPicker onDayClick={this.handleDayClick}  />

          {this.state.selectedDay ? (
            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
       
            
       
          <ReactModal 
            isOpen={this.state.showModal} 
            >
           
            <Day dateSelected={this.state.selectedDay}/>
          
            <button className="slotsButton" onClick={this.handleCloseModal}>Home</button>
          </ReactModal>
        

         



      </div>
    );
  }
}







        //   <Day selectedDay={this.selectedDay} />