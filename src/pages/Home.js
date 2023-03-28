import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import Paginate from './Paginate';
import './Home.css';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {

  let dispatch = useDispatch();
  let history = useNavigate();

  const { users } = useSelector(state => state.data)

  const [term, setTerm] = useState("")


  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = users.slice(firstPostIndex, lastPostIndex)


  useEffect(() => {   // It will show whole output when page is mounting ; (mounting = page loading)
    dispatch(loadUsers())
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure wanted to delete user ??')) {
      dispatch(deleteUser(id));
    }
  }


  return (
    <div className='App'>
      <br />
      <input type="text"
        placeholder="Search here"
        label="Search here"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{
          width: "30%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "2px solid #ccc",
        }} />
      <br /><br /><br />

      <div>
        <button
          className='button'
          varient="contained"
          color="primary"
          onClick={() => history("/addUser")}>
          Add
        </button>
      </div><br /><br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, marginLeft: "30px", marginRight: "30px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Birth_Date</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentPosts
              .filter((filterData) => {
                return (filterData.firstName.indexOf(term) >= 0 || filterData.gender.indexOf(term) >= 0 || filterData.birthDate.toLowerCase().indexOf(term) >= 0)
              }).map((user) => (

                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">{user.firstName}</StyledTableCell>
                  <StyledTableCell align="center">
                    <a href={user.image}>
                      <img src={user.image} style={{ width: '50px', height: '30px' }} />
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.gender}</StyledTableCell>
                  <StyledTableCell align="center">{user.birthDate}</StyledTableCell>
                  <StyledTableCell align="center">


                    <div>
                      <button
                        className='button'
                        color="primary"
                        onClick={() => history(`/viewUser/${user.id}`)}>View
                      </button>
                      <button
                        className="button"
                        color="secondary"
                        onClick={() => handleDelete(user.id)}>
                        delete
                      </button>
                      <button
                        className="button"
                        color="primary"
                        onClick={() => history(`/editUser/${user.id}`)}>Edit
                      </button>
                    </div>


                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br /><br />
      <Paginate totalPosts={users.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <br /><br /><br />

    </div>
  );
}

export default Home
