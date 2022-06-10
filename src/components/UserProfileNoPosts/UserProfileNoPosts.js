import styles from './UserProfileNoPosts.module.css';

export default function UserProfileNoPosts({
    isOwnProfile
}) {

    let screen;

    if (isOwnProfile) {
        screen = (
            <section className={styles.noPosts}>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="/images/noPostsImage.jpg" alt="" />
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.pContainer}>
                        <p className={styles.textBold}>
                            Start capturing and sharing your moments.
                        </p>
                        <p className={styles.textNormal}>
                            Share your first photo or video.
                        </p>
                    </div>
                </div>
            </section>
        )
    } else {
        screen = (
            <section className={styles.noPosts}>
                <div className={styles.content}>
                    <div className={styles.contentContainer}>
                        <div className={styles.iconContainer}>
                            <span className={styles.icon} ><i className="fa-solid fa-camera"></i></span>
                        </div>
                        <p className={styles.contentText}>No Posts Yet</p>
                    </div>
                </div>
            </section>
        )
    }

    return screen;
}