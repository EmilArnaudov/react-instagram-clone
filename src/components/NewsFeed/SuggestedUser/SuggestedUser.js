import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext, FirebaseContext } from '../../../App';
import { followUser } from '../../../services/userService';
import styles from './SuggestedUser.module.css';

export default function SuggestedUser({
    user
}) {

    const {db} = useContext(FirebaseContext);
    const {userData} = useContext(CurrentUserContext);

    if (!user) {
        return;
    }

    function followButtonHandler() {
        followUser(db, userData, user);
    }

    return (
        <div className={styles.container}>
            <div className={styles.userPicContainer}>
            <Link className={styles.link} to={user.username}><img src={user.profilePic.length > 0 ? user.profilePic : "/images/defaultPic.jpg"}  alt="" /></Link>

            </div>
            <div className={styles.userDetails}>
                <Link className={styles.link} to={user.username}><p className={styles.username}>{user.username}</p></Link>
                <p className={styles.whoFollows}>Follows you</p>
            </div>
            <div className={styles.action}>
                <span className={styles.followButton} onClick={followButtonHandler}>Follow</span>
            </div>
        </div>
    )
}