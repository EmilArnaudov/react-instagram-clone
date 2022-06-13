import styles from './ChatMessage.module.css';

export default function ChatMessage() {
    return (
        <div className={styles.container}>
                <div className={styles.message}>
                    <div className={styles.messageContent}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae sapiente vitae animi sunt nisi vero, non exercitationem neque, omnis itaque voluptatem libero, a recusandae unde consectetur nihil assumenda soluta mollitia culpa commodi ipsam aperiam! Molestias eos sint saepe, similique harum corrupti impedit eum magnam cupiditate facere quidem, explicabo placeat a.
                    </div>
                </div>
        </div>
    )
}