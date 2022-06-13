import styles from './ChatMessage.module.css';

export default function ChatMessage() {
    return (
        <div className={styles.container}>
                <div className={styles.message}>
                    <div className={styles.messageContent}>
                        Lorem 
                    </div>
                </div>
        </div>
    )
}