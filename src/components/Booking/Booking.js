import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [ booking, setBooking ] = useState([]);
    const [logedInUser, setLoggedInUser] = useContext(UserContext);
   
    useEffect(()=>{
        fetch('http://localhost:5000/getbooking/?email='+logedInUser.email,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            authorization:`Bearer ${sessionStorage.getItem('token')}`
        }
        })

        .then(res => res.json())
        .then(data =>{
            setBooking(data)
        })
    },[])
    return (
        <div>
            <h3>You have: {booking.length}bookings</h3>
            {booking.map(bk=><li key={bk._id}>{bk.email} from {(new Date(bk.checkInDate).toDateString('dd/MM/yyyy'))}</li>)}
        </div>
    );
};

export default Booking;