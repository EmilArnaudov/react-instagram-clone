import styles from './Chat.module.css';
import Navigation from '../Navigation/Navigation';
import ChatContact from './ChatContact/ChatContact';
import { onSnapshot, doc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext, FirebaseContext } from '../../App';
import { loadAllChats } from '../../services/chatService';
import { useLocation, useParams } from 'react-router-dom';
import ChatMessages from './ChatMessages/ChatMessages';

export default function Chat({

}) {
    const { db } = useContext(FirebaseContext);
    const { userData } = useContext(CurrentUserContext);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatSelected, setChatSelected] = useState(false)
    const { chatID } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (userData) {

            loadAllChats(db, userData)
                .then(allChats => {
                    setChats(allChats);        
                }) 
            
        }
    }, [userData])

    useEffect(() => {
        if (chatID !== 'inbox') {
            setChatSelected(true);
        } else {
            setChatSelected(false);
        }
    }, [userData])

    useEffect(() => {
        if (chatID !== 'inbox') {
            const unsub = onSnapshot(doc(db, "chats", chatID), (doc) => {
                let data = doc.data();
                data.messages = data.messages.reverse();
                setCurrentChat(data);
                setChatSelected(true);
            });

            return unsub;
        } else {
            setCurrentChat(null);
            setChatSelected(false);
        }
    }, [chatID, location])

    if (!userData) {
        return;
    }


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
                    <ChatMessages chat={currentChat} chatSelected={chatSelected}></ChatMessages>
                </div>
            </div>
        </div>
        </>

    )
}