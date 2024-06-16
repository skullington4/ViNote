import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../index.css';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import Projects from '../Projects/Projects';

import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

export default function App() {

  const [user, setUser] = useState(null);

  return (  
    <>
    
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects user={user} />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp  setUser={setUser}/>} />
      </Routes>
      <Footer />
    </>
  );
}

