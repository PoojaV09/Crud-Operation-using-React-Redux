import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';
import { Select, MenuItem } from '@mui/material';

const AddUser = () => {
    const [state, setState] = useState({
        firstName: "",
        image: "",
        gender: "",
        birthDate: "",
        email:"",
        company:"",
        department:""
    })

    const [error, setError] = useState("");
    const [gender, setGender] = useState("");

    let history = useNavigate();

    let dispatch = useDispatch();

    const { firstName, image,  birthDate, email,company, department } = state;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
        setGender(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName || !image || !gender || !birthDate || !email || !company || !department) {
            setError("Please fill all details");
        } else {
            dispatch(addUser(state))
            history('/');
            setError("");
        }
    }

    return (
        <div className="App">
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Button
            className='buttonadd'
                style={{ width: "100px", marginTop: "20px",backgroundColor: '#fc4c4e', color: "#ffffff",boxShadow:" 0 8px 8px -8px black" }}
                varient="contained"
                color="secondary"
                onClick={() => history('/')}>
                Go back
            </Button>

            <h2 align='right'>Add User</h2><br />

            {error && <h3 style={{color:"red",align:'right' }}>{error}</h3>}

            <TextField id="outlined-basic" label="firstName" value={firstName} type="text" onChange={handleInputChange} name="firstName"/><br />
            <TextField id="outlined-basic" label="image_url" value={image} type="href" onChange={handleInputChange} name="image"/><br />
            <Select  name="gender" value={gender || ""} onChange={handleInputChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
            </Select><br />
            <TextField id="outlined-basic" label="" value={birthDate} type="date" onChange={handleInputChange} name="birthDate"/><br />
            <TextField id="outlined-basic" label="email" value={email} type="email" onChange={handleInputChange} name="email"/><br />
            <TextField id="outlined-basic" label="company" value={company} type="text" onChange={handleInputChange} name="company"/><br />
            <TextField id="outlined-basic" label="department" value={department} type="text" onChange={handleInputChange} name="department"/><br /><br/>

            <Button
                className='buttonadd'
                style={{ width: "100px",marginTop: "20px",backgroundColor: '#3A3B3C', color: "#ffffff",boxShadow:" 0 8px 8px -8px black" }}
                varient="contained"
                color="primary"
                type="submit"
                onChange={handleInputChange}>
                Submit
            </Button>      
            <br/><br/><br/><br/> <br/><br/> 
        </Box>
        </div>
    )
}

export default AddUser
