import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../redux/actions';
import { useParams } from 'react-router-dom';

const ViewUser1 = () => {

  let dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getSingleUser(id))
  }, [])

  const { user } = useSelector((state) => state.data);

  return (
    <div align="center">

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch', justifyContent: "center" },
        }}
        noValidate
        autoComplete="off">


        <h2>Name: {user.firstName}</h2>
        <h2>Gender :{user.gender}</h2>
        <h2>Birthdate: {user.birthDate}</h2>
        <h2>Email: {user.email}</h2>

        <a href={user.image}>
          <img src={user.image} style={{ width: '500px', height: '300px' }} />
        </a>
        <h2>Company: {user.company}</h2>
        <h2>Department: {user.department}</h2>

      </Box>
    </div>
  )
}

export default ViewUser1;