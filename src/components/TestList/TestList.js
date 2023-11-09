import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom"
import "./TestList.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


const Login = () => {
    const navigate = useNavigate()
    const [test, setTest] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!localStorage.getItem('testCenterId')) navigate('/')

        const testData = {
            name: test,
            description: description,
            price: price,
            centerId: localStorage.getItem('testCenterId')
        }

        console.log(description, test, price)
        axios.post('https://mediscan-3qze.onrender.com/api/test/create', testData)
            .then((response) => {
                if (response.data.status == "200") {
                    alert('Created Successfully')
                }
                else alert('Retry!!!')
            })
            .catch((err) => console.log(err))

        setTest("")
        setPrice("")
        setDescription("")

    }

    return (
        <div className="Centerdiv">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Create Test</h2>
                <TextField
                    label="Test"
                    onChange={e => setTest(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={test}
                />
                <TextField
                    label="Price"
                    onChange={e => setPrice(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={price}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="Description"
                    onChange={e => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text-field"
                    fullWidth
                    value={description}
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Add Test</Button>

            </form>
        </div>
    );
}

export default Login;