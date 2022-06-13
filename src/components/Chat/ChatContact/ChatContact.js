import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../App';
import styles from './ChatContact.module.css';

export default function ChatContact({
    chat
}) {

    const { userData } = useContext(CurrentUserContext);
    const [contactData, setContactData] = useState(null);

    useEffect(() => {
        if (userData && chat) {
            let contData = userData.username === chat.user.username ? chat.otherUser : chat.user;
            setContactData(contData);
        }
    }, [userData])

    if (!contactData) {
        return;
    }


    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.imageContainer}>
                    <img src={contactData.profilePic.length > 0 ? contactData.profilePic : "/images/defaultPic.jpg"} alt="user" />
                </div>
                <div className={styles.nameContainer}>
                    <span>{contactData.username}</span>
                    <div className={styles.details}>
                        <span className={styles.lastMessageContainer}>
                            <span>{chat.messages[chat.messages.length - 1]}</span>
                        </span>
                        <span>.</span>
                        <span>1w</span>
                    </div>
                </div>
            </div>
        </div>
    )
}