import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (<div>
        {user.image && user.image !== "" ?
                                <Image src={user.image} roundedCircle className="user-picture" /> : <FontAwesomeIcon icon={faUserCircle} className="user-picture" />}
        <div>Name: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
    </div>);
}

export default Profile;