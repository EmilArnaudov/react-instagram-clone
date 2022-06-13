import styles from './Chat.module.css';
import Navigation from '../Navigation/Navigation';
import ChatContact from './ChatContact/ChatContact';
import ChatMessage from './ChatMessage/ChatMessage';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext, FirebaseContext } from '../../App';
import { loadAllChats } from '../../services/chatService';

export default function Chat({

}) {
    const { db } = useContext(FirebaseContext);
    const { userData } = useContext(CurrentUserContext);
    const [chats, setChats] = useState([]);


    useEffect(() => {
        if (userData) {

            loadAllChats(db, userData)
                .then(allChats => {
                    setChats(allChats);        
                }) 
            
        }
    }, [userData])


    if (!userData) {
        return;
    }

    // console.log(chats[0]);

    return (

        <>
        <Navigation></Navigation>
        <div className={styles.background}>
            <div className={styles.outerWrapper}>
                <div className={styles.chat}>
                    <div className={styles.contacts}>
                        <div className={styles.contactsHeader}>
                            <span className={styles.username}>{userData.username}</span>
                        </div>
                        <div className={styles.contactsBody}>
                            {chats.map((chat) => <ChatContact key={Math.random()} chat={chat} ></ChatContact>)}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            <div className={styles.contentHeaderInner}>
                                <div className={styles.userPicContainer}>
                                    <img src="/images/defaultPic.jpg" alt="user" />
                                </div>
                                <div className={styles.usernameContainer}>
                                    <span>Username</span>
                                </div>
                                <div className={styles.iconContainer}>
                                    <span><i className={["fa-solid", "fa-circle-info", styles.icon].join(' ')}></i></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.messages}>
                            <ChatMessage></ChatMessage>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.inputContainerInner}>
                                <div className={styles.inputParts}>
                                    <div className={styles.emojiIconContainer}>
                                        <span className={styles.inputIcons}><i className="fa-solid fa-face-smile-beam"></i></span>
                                    </div>
                                    <div className={styles.inputDiv}>
                                        <textarea className={styles.input} type="text" placeholder='Message..'></textarea>
                                    </div>
                                    <div className={styles.attachBtn}>
                                        <span className={styles.inputIcons}><i className="fa-solid fa-image"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}