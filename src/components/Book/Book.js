import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { Grid, Button } from '@material-ui/core';
import Booking from '../Booking/Booking';

const Book = () => {
    const {bedType} = useParams();
    const [logedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
       checkInDate: new Date(),
       checkOutDate: new Date()
    });

    const handleCheckInDate = (data) => {
        const newDate = {...selectedDate}
        newDate.checkInDate = data;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (data) => {
        const newDate = {...selectedDate}
        newDate.checkOutDate = data;
        setSelectedDate(newDate);
      };
    const handleBooking = () =>{
        const newData = {...logedInUser, ...selectedDate};
        fetch('http://localhost:5000/addbooking',{
            method:'POST',
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify(newData)
        })
        .then(res => res.json())
        .then (data =>{
            console.log(data)
        })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello{logedInUser.name}</h1>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate.checkInDate}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate.checkOutDate}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    
      </Grid>
    </MuiPickersUtilsProvider>

    <Button onClick={handleBooking} variant="contained" color="primary">
  Book Now
</Button>
<Booking/>
        </div>
    );
};

export default Book;