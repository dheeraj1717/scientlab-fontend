import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../redux/actions/authActions';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo2.png';


function SciNavbar() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        console.log('User logged out');
    };
    const getAccount = () => {
        navigate("/profile")
    }
    return (
        <Navbar bg="dark" expand="lg" style={{ position: "fixed", width: "100%", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", zIndex: "2" }}>
            <Navbar.Brand as={Link} to="/"><img src={logo} alt="Sciboard" width="140" height="20" style={{ paddingLeft: "10px" }} /></Navbar.Brand>
            <div style={{ color: "white" }}>| Sci-Board</div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav style={{ position: 'absolute', right: 0 }}>
                    <div style={{ right: 0 }}><SearchBar /></div>
                    <Dropdown style={{ "paddingRight": "10px" }}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            {user.image && user.image !== "" ?
                                <Image src={user.image} roundedCircle className="user-picture" /> : <FontAwesomeIcon icon={faUserCircle} className="user-picture" />}
                            {user.username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={getAccount}><FontAwesomeIcon icon={faUser} /> Account</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SciNavbar