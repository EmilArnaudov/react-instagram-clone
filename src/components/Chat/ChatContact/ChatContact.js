import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../../App';
import { formatTimePassed } from '../../../services/chatService';
import styles from './ChatContact.module.css';

export default function ChatContact({
    chat,
    isActive,
}) {
    const navigate = useNavigate();
    const { userData } = useContext(CurrentUserContext);
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        if (userData && chat) {
            let contData = userData.username === chat.user.username ? chat.otherUser : chat.user;
            setContactData(contData);
        }
    }, [userData])

    if (!contactData || !chat) {
        return;
    }

    const clickHandler = () => {
        navigate('/messages/' + chat.id)
    }

    return (
        <div onClick={clickHandler} className={isActive ? [styles.container, styles.active].join(' ') : styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.imageContainer}>
                    <img src={contactData.profilePic.length > 0 ? contactData.profilePic : "/images/defaultPic.jpg"} alt="user" />
                </div>
                <div className={styles.nameContainer}>
                    <span>{contactData.username}</span>
                    <div className={styles.details}>
                        <span className={styles.lastMessageContainer}>
                            <span>{chat.messages.length > 0 ? chat.messages[0].content : 'No texts yet'}</span>
                        </span>
                        <div className={styles.dotContainer}>
                            <span className={styles.dot}>.</span>
                        </div>
                        
                        <span>{chat.messages.length > 0 ? formatTimePassed( chat.messages[0].time): 'Now'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}