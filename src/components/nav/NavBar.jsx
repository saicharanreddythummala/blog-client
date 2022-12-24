import React from 'react';
import './navBar.scss';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';

export default function NavBar() {
  const { logoutHandler } = useContext(UserContext);
  const navigate = useNavigate();

  const {user} = useContext(UserContext);

  return (
    <>
      <nav className="nav_bar d-flex align-items-center">
        <div className="n_left">
          <ul className="d-flex justify-content-around">
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            {/* <li>
              <Link to="/about">About</Link>
            </li> */}
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/new">Write</Link>
            </li>
          </ul>
        </div>
        <div className="n_right me-4 d-flex align-items-center">
          <div className="u_divider">
            <Avatar>H</Avatar>
            <div className="u_options">
              <ul>
                <li className='border-bottom pb-2' onClick={()=>{navigate(`/update/${user._id}`)}}>My account</li>
                <li
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
          {/* <SearchIcon /> */}
        </div>
      </nav>
    </>
  );
}
