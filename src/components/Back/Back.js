import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import './Back.css';
import { Link } from "react-router-dom";
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="center-container">
                    <Container>
                        <main>
                            <Typography variant="h2">Medi-Scan</Typography>
                            <Typography variant="body1">
                                ALL IN ONE PLATFORM FOR YOUR NEXT DIAGNOSIS
                            </Typography>
                            <Link to='/login' style={{ textDecoration: "None" }}>
                                <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
                                    Sign in for Diagnosis
                                </Button>
                            </Link>
                            <Link to='/login-pat' style={{ textDecoration: "None" }}>
                                <Button variant="contained" color="secondary">
                                    Sign in for Patient
                                </Button>
                            </Link>
                        </main>
                    </Container>
                </div>
            </div>
        );
    }
}

export default App;
