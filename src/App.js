import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.css'
import Addedit from './components/addedit';

function App() {
  return (
   <BrowserRouter>
      <div className="App">
       <ToastContainer />
    </div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/addedit/:id' element={<Addedit />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
