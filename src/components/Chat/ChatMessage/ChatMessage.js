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

    const messageClasses = userData.username === chatMessage.owner ? ownerClasses : guestClasses


    return (
        <div className={guestClasses}>
                <div className={styles.message}>
                    <div className={styles.messageContent}>
                        <p>{chatMessage.content}</p>
                    </div>
                </div>
        </div>
    )
}