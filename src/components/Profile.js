import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    return (<div>
        <Image src={user.image} roundedCircle className="user-picture" />
        <div>Name: {user.username}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
    </div>);
}

export default Profile;