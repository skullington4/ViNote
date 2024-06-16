import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../index.css';
import NavBar from '../../Components/NavBar/NavBar';
import Footer from '../../Components/Footer/Footer';
import Home from '../Home/Home';
import Pricing from '../Pricing/Pricing';
import About from '../About/About';
import SignIn from '../SignIn/SignIn';
import Blog from '../Blog/Blog';
import SignUp from '../SignUp/SignUp';
import AdditionalInfo from '../../Components/AdditionalInfo/AdditionalInfo';

export default function App() {

  const [user, setUser] = useState(null);

  return (
    <>
    
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/prices' element={<Pricing />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/additional-info' element={<AdditionalInfo />} />
      </Routes>
      <Footer />
    </>
  );
}

