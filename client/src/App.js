import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Auth from './auth';
import Home from './home';
import Jobs from './job';
import JobDeailsId from './jobdetails';
import NotFound from './notfound';

function App() {
  return (
  <>
  <Routes>
    <Route exact path = '/auth' element = {<Auth/>}/>
    <Route exact path = '/home' element = {<Home/>}/>
    <Route exact path = '/jobs' element = {<Jobs/>}/>
    <Route exact path = '/jobs/:jobId' element = {<JobDeailsId/>}/>
    <Route exact path = '*' element = {<NotFound/>}/>

  </Routes>

  
  
  </>
    
  );
}

export default App;
