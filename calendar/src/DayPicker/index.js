
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import ReactModal from 'react-modal';
import Day from '../Day/index' 

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    
    this.state = {
      selectedDay: undefined,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }



  handleOpenModal () {
    this.setState({showModal: true });
  }


  handleDayClick(day) {
    this.setState({ 
      selectedDay: day,
       
    });
    this.handleOpenModal();
   // this.props.onDayClick1 && this.props.onDayClick1(e, day);
  }


  handleCloseModal () {
    this.setState({ showModal: false }); }


  

  render() {
    return (
      <div>
         <div>
        <DayPicker onDayClick={this.handleDayClick} />
          {this.state.selectedDay ? (
            <p>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
          ) : (
            <p>Please select a day.</p>
          )}
        </div>

         <div>
          <ReactModal 
            isOpen={this.state.showModal} >
            <p> this is a modal </p>
            <Day selectedDay={this.state.selectedDay}/>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
         </div>



      </div>
    );
  }
}







        //   <Day selectedDay={this.selectedDay} />