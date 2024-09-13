import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Donar from './pages/Dashboard/Donar';
import Hospital from './pages/Dashboard/Hospital';
import Organisation from './pages/Dashboard/Organisation';
import Consumer from './pages/Dashboard/Consumer';
import Donation from './pages/Donation';

function App() {
  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <HomePage/>
        </ProtectedRoute>
      }/>
      <Route path='/donar' element={
        <ProtectedRoute>
          <Donar/>
        </ProtectedRoute>
      }/>
       <Route path='/hospital' element={
        <ProtectedRoute>
          <Hospital/>
        </ProtectedRoute>
      }/>
      <Route path='/consumer' element={
        <ProtectedRoute>
          <Consumer/>
        </ProtectedRoute>
      }/>
        <Route path='/donation' element={
        <ProtectedRoute>
          <Donation/>
        </ProtectedRoute>
      }/>
       <Route path='/orginastion' element={
        <ProtectedRoute>
          <Organisation/>
        </ProtectedRoute>
      }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
