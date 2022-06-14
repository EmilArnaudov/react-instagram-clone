import styles from './ChatMessage.module.css';

export default function ChatMessage({
    chatMessage,
    userData
}) {
    const ownerClasses = styles.owner
    const guestClasses = styles.guest

    if (!chatMessage && !userData) {
        return;
    }

    const isOwner = userData.username === chatMessage.owner

    const messageClasses =  isOwner ? ownerClasses : guestClasses


    return (
        <div className={messageClasses}>
                <div className={isOwner ? styles.message : styles.messageGuest}>
                    <div className={styles.messageContent}>
                        <p>{chatMessage.content}</p>
                    </div>
                </div>
        </div>
    )
}