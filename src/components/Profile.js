import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className='flex flex-col items-center justify-center '> 
            <div className='text-center text-[2rem] font-semibold mb-10 text-gray-700'>Account</div>
            <div className='text-center'>
                <div className="mb-4">
                    {user.image && user.image !== "" ? (
                        <img
                            src={user.image}
                            roundedCircle
                            className="user-picture"
                            style={{ width: '64px', height: '64px' }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className="user-picture"
                            style={{ width: '100px', height: '100px' }}
                        />
                    )}
                </div>

                <div className='flex flex-col text-left'>
                    <div className='text-[1.5rem] font-semibold text-gray-700 capitalize mb-2'>
                        <span className='font-bold text-gray-800 mr-2'>Name :</span>
                        {user.username}
                    </div>
                    <div className='text-[1.5rem] font-semibold text-gray-700 capitalize mb-2'>
                        <span className='font-bold text-gray-800 mr-2'>Email :</span>
                        {user.email}
                    </div>
                    <div className='text-[1.5rem] font-semibold text-gray-700 capitalize mb-2'>
                        <span className='font-bold text-gray-800 mr-2'>Role :</span>
                        {user.role}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
