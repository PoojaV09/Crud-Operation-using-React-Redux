// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ViewUser1 from './pages/ViewUser1';


function App() {
  return (
    <div className="App">
   
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/addUser' element={<AddUser/>}></Route>
      <Route path='/editUser/:id' element={<EditUser/>}></Route>
      <Route path='/viewUser/:id' element={<ViewUser1/>}/>
      </Routes>
    </div>
  );
}

export default App;
