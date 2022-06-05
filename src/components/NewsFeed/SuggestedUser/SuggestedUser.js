import styles from './SuggestedUser.module.css';

export default function SuggestedUser() {
    return (
        <div className={styles.container}>
            <div className={styles.userPicContainer}>
                <img src="/images/defaultPic.jpg" alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>username</p>
                <p className={styles.whoFollows}>Followed by marrinn</p>
            </div>
            <div className={styles.action}>
                <a className={styles.followButton} href="">Follow</a>
            </div>
        </div>
    )
}