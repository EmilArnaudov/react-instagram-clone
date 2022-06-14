import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext, FirebaseContext } from '../../../App';
import { createChatMessage } from '../../../services/chatService';
import ChatMessage from '../ChatMessage/ChatMessage';
import styles from './ChatMessages.module.css';

export default function ChatMessages({
    chat,
    chatSelected
}) {


    const {userData} = useContext(CurrentUserContext);
    const {db} = useContext(FirebaseContext);
    const [contactData, setContactData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (userData && chat) {
            let contData = userData.username === chat.user.username ? chat.otherUser : chat.user;
            setContactData(contData);
        }
    }, [userData, chat])

    const onChangeHandler = (e) => {
        setMessage(e.target.value);
    }

    const onSubmitHandler = (e) => {      
        if (e.key === 'Enter') {
            e.preventDefault();
            createChatMessage(db, chat.id, message, userData);
            setMessage('');
        } else {
            onChangeHandler(e)
        }
    }
 
    let inboxDisplay = 
    <>
        <div className={styles.noSelectContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>
                    <span className={styles.inboxIcon}><i className="fa-solid fa-paper-plane"></i></span>
                </div>
                <div className={styles.middleText}>
                    <p className={styles.heading}>Your Messages</p>
                    <p className={styles.subheading}>Send private photos and messages to a friend or group.</p>
                </div>
            </div>
        </div>
    </>

    if (!chatSelected) {
        return inboxDisplay;
    }

    if (!userData || !contactData) {
        return;
    }

    let chatDisplay = 
    <>
    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <div className={styles.contentHeaderInner}>
                                <div className={styles.userPicContainer}>
                                <img src={contactData.profilePic.length > 0 ? contactData.profilePic : "/images/defaultPic.jpg"} alt="user" />
                                </div>
                                <div className={styles.usernameContainer}>
                                    <span>{contactData.username}</span>
                                </div>
                                <div className={styles.iconContainer}>
                                    <span><i className={["fa-solid", "fa-circle-info", styles.icon].join(' ')}></i></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.messages}>
                            {chat.messages.map((chatMessage) => <ChatMessage key={Math.random()} userData={userData} chatMessage={chatMessage}></ChatMessage>)}
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.inputContainerInner}>
                                <div className={styles.inputParts}>
                                    <div className={styles.emojiIconContainer}>
                                        <span className={styles.inputIcons}><i className="fa-solid fa-face-smile-beam"></i></span>
                                    </div>
                                    <div className={styles.inputDiv}>

                                            <textarea 
                                            value={message} 
                                            onChange={onChangeHandler}
                                            onKeyDown={onSubmitHandler}
                                            className={styles.input} 
                                            type="text" placeholder='Message..'></textarea>

                                    </div>
                                    <div className={styles.attachBtn}>
                                        <span className={styles.inputIcons}><i className="fa-solid fa-image"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    </> 


    return (
        chatDisplay
    )
}