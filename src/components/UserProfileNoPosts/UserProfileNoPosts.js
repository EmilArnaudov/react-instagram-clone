import styles from './UserProfileNoPosts.module.css';

export default function UserProfileNoPosts() {
    return (
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
}