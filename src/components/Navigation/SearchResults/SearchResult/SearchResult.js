import { useNavigate } from 'react-router-dom';
import styles from './SearchResult.module.css';

export default function SearchResult({
    user
}) {
    const navigate = useNavigate();

    if (!user) {
        return;
    }

    const clickHandler = () => {
        navigate('/' + user.username)
    }

    return (
        <div onClick={clickHandler} className={styles.container}>
            <div className={styles.profilePicContainer}>
                <img className={styles.profilePic} src={user.profilePic.length > 0 ? user.profilePic : "/images/defaultPic.jpg"} alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{user.username}</p>
                <p className={styles.description}>{user.description[0]}</p>
            </div>
        </div>  
    )
}