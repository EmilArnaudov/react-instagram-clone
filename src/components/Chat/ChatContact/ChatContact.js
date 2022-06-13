import styles from './ChatContact.module.css';

export default function ChatContact() {
    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.imageContainer}>
                    <img src="/images/defaultPic.jpg" alt="user" />
                </div>
                <div className={styles.nameContainer}>
                    <span>Username</span>
                    <div className={styles.details}>
                        <span className={styles.lastMessageContainer}>
                            <span>last message Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur cupiditate harum quas asperiores, quaerat esse?</span>
                        </span>
                        <span>.</span>
                        <span>1w</span>
                    </div>
                </div>
            </div>
        </div>
    )
}