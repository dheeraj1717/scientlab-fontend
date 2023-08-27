import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../redux/actions/authActions';

import { faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo2.png';
import SearchBar from './SearchBar'

function SciNavbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log('User logged out');
  };

  const getAccount = () => {
    navigate('/profile');
  };

  return (
    <nav className="bg-dark  shadow-md w-full right-0  py-3">
      <div className="container mx-auto flex justify-between items-center px-8 pl-28 py-[1px]">
        <Link to="/" className="flex items-center space-x-2 text-white text-decoration-none">
          <img src={logo} alt="Sciboard" className="w-36 h-6" />
          <div> |  Sci-Board</div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="pt-2">
          </div>
          <div className="relative">
            <button className="text-white">
              {user.image && user.image !== '' ? (
                <img
                  src={user.image}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="text-2xl"
                />
              )}
              <span className='capitalize ml-2 '>{user.username}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-dark rounded-lg shadow-lg hidden">
              <ul className="py-1">
                <li className="hover:bg-gray-700">
                  <button
                    onClick={getAccount}
                    className="block w-full text-left px-4 py-2 text-white"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" /> Account
                  </button>
                </li>
                <li className="hover:bg-gray-700">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SciNavbar;
