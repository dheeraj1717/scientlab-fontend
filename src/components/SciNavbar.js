import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../redux/actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
        <Navbar bg="dark" variant="dark" expand="lg" style={{position: "fixed", width: "100%"}}>
            <Navbar.Brand as={Link} to="/"><img src={logo} alt="Sciboard" width="140" height="20" style={{paddingLeft: "10px"}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline="true">
                    <div className="search-container">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" icon={faSearch}/>
                    </div>
                </Form>
                <Nav style={{ position: 'absolute', right: 0 }}>
                    <Dropdown style={{"paddingRight": "10px"}}>                        
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        <Image src={user.image} roundedCircle className="user-picture" />
                            {user.username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{"backgroundColor": "#f5f5f5"}}>
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