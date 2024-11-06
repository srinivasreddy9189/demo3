
import './header.css'

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    let navigate = useNavigate();

    const onClickDel = ()=>{
        Cookies.remove('jwtToken');
        navigate('/auth')
    }
    return(
        <div className="container-fluid cont9">
            <div className="row d-flex justify-content-between cont6 ">
                <div>
                    <img className='img-fluid ml-2' src="https://assets.ccbp.in/frontend/react-js/logo-img.png"/>
                </div>
                <div className="job_btn">
                <Link to='/home' className='text-light link'>  <b className='mr-3'>Home</b></Link> 
                  <Link to='/jobs' className='text-light link'> <b>Jobs</b></Link> 
                </div>
                <div className='btn3 mr-3'>
                    <button className="btn  log_btn" onClick={onClickDel}>Logout</button>
                </div>

            </div>

        </div>
    );
}

export default Header;