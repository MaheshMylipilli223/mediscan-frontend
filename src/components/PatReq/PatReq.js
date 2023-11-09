import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../Navbar/Navbar';
import Thetimer from './Thetimer';
import Thecalendar from './Thecalendar';
import './PatReq.css';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

export default function PatReq() {
    const [expanded, setExpanded] = useState(false);
    const [additionalAccordions, setAdditionalAccordions] = useState([]);
    const [newAccordionData, setNewAccordionData] = useState(null);
    const [bookings, setBookings] = useState([])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        axios.post('https://mediscan-3qze.onrender.com/api/booking/testcenter', {
            id: localStorage.getItem('testCenterId')
        }).then((response) => {
            setBookings(response.data.bookings)
        }).catch((err) => console.log(err))
    }, [bookings])

    const addAccordion = () => {
        if (newAccordionData) {
            setAdditionalAccordions((prevState) => [
                ...prevState,
                {
                    id: `panel${prevState.length + 1}`,
                    title: newAccordionData.title || 'New Accordion',
                    content: newAccordionData.content || 'Accordion content goes here',
                    profilePicture: newAccordionData.profilePicture || '',
                    userName: newAccordionData.userName || '',
                    testName: newAccordionData.testName || '',
                    fullName: newAccordionData.fullName || 'Full Name',
                    age: newAccordionData.age || 'Age',
                    gender: newAccordionData.gender || 'Gender',
                    selectedDate: newAccordionData.selectedDate || '', // Add selectedDate field
                    selectedTime: newAccordionData.selectedTime || '', // Add selectedTime field
                    display: true,
                },
            ]);
            setNewAccordionData(null);
        }
    };

    const removeAccordion = (accordionId) => {
        setAdditionalAccordions((prevState) =>
            prevState.map((accordion) => {
                if (accordion.id === accordionId) {
                    return { ...accordion, display: false };
                }
                return accordion;
            })
        );
    };

    const handleAcceptClick = async (accordionId) => {
        try {
            const accordion = additionalAccordions.find((a) => a.id === accordionId);
            if (!accordion) return;

            // Send selected time and date data to the backend
            const response = await fetch('/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedDate: accordion.selectedDate,
                    selectedTime: accordion.selectedTime,
                }),
            });

            if (response.ok) {
                // Handle success, e.g., remove the accordion from the UI
                removeAccordion(accordionId);
            } else {
                // Handle errors
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };



    // const handleAccept = (id) => {
    //     axios.post('https://mediscan-3qze.onrender.com/api/booking/status-update', {
    //         id: id,
    //         status: "Accepted",
    //         slot: new Date().toDateString
    //     }).then((response) => {
    //         if (response.status == 200) {
    //             alert("Accepted Successfully")
    //         }
    //         else alert("Retry!!!")
    //     }).catch((err) => console.log(err))

    // }


    const handleAccept = (id) => {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        axios
            .post('https://mediscan-3qze.onrender.com/api/booking/status-update', {
                id: id,
                status: 'Accepted',
                slot: dateString,
            })
            .then((response) => {
                if (response.status === 200) {
                    alert('Accepted Successfully');
                } else {
                    alert('Retry!!!');
                }
            })
            .catch((err) => console.log(err));
    };

    const handleDeny = (id) => {
        axios.post('https://mediscan-3qze.onrender.com/api/booking/status-update', {
            id: id,
            status: "Denied",
            slot: 'Sorry, Currently Slot Not Available'
        }).then((response) => {
            if (response.status === 200) {
                alert("Denied Successfully")
            }
            else alert("Retry!!!")
        }).catch((err) => console.log(err))
    }




    return (
        <>
            <Navbar />
            <div className='PatReqdiv'>
                <h1>Patients Requests</h1>
                <TableContainer component={Paper} sx={{ width: '70%' }} className="TableContainer">
                    <Table sx={{ width: '100%' }} aria-label="patient requests table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.testName}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell>
                                        <Button sx={{ margin: 1 }}
                                            variant="outlined"
                                            onClick={() => handleAccept(booking._id)}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleDeny(booking._id)}
                                        >
                                            Deny
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}