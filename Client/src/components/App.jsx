
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Register from './Register';
import Dashboard from './dashboard';
import QuizComponent from './QuizComponent';
import Questions from './Questions';
import Result from './Result';


function App() {

  

  return (
    
    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserLogin />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard/>}/> 
            <Route path="/quiz" element={<QuizComponent />}/> 
            <Route path="/questions" element={<Questions/>} /> 
            <Route path="/result" element={<Result/>} />     
        </Routes>
    </BrowserRouter>
    
  )
}



export default App
