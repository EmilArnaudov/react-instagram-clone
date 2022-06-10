import styles from './UserProfileNoSaved.module.css';

export default function UserProfileNoSaved() {
    return (
    <section className={styles.noPosts}>
        <div className={styles.content}>
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>
                    <span className={styles.icon} ><i className="fa-solid fa-camera"></i></span>
                </div>
                <p className={styles.contentText}>You Don't Have Any Saved Posts</p>
            </div>
        </div>
    </section>
    )
}