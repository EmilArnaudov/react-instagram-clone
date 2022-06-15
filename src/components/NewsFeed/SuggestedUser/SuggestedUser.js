import styles from './SuggestedUser.module.css';

export default function SuggestedUser({
    user
}) {

    if (!user) {
        return;
    }

    return (
        <div className={styles.container}>
            <div className={styles.userPicContainer}>
                <img src={user.profilePic.length > 0 ? user.profilePic : "/images/defaultPic.jpg"}  alt="" />
            </div>
            <div className={styles.userDetails}>
                <p className={styles.username}>{user.username}</p>
                <p className={styles.whoFollows}>Follows you</p>
            </div>
            <div className={styles.action}>
                <a className={styles.followButton} href="">Follow</a>
            </div>
        </div>
    )
}