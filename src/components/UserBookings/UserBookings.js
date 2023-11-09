import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Navbar from '../NavBar1/NavBar1';
import './UserBooking.css';

function UserBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.post("https://mediscan-3qze.onrender.com/api/booking/user", {
            id: localStorage.getItem('userId')
        })
            .then((response) => {
                setBookings(response.data.bookings);
            })
            .catch((err) => console.log(err));
    }, [bookings]);

    return (
        <>
            <Navbar />
            <div className='userbookingdiv'>
                <h1>My Bookings</h1>
                <TableContainer component={Paper} sx={{ width: '70%' }}>
                    <Table sx={{ width: '100%' }} aria-label="user bookings table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Slot</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.testName}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>{booking.slot}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default UserBookings;
