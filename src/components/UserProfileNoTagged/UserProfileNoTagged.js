import styles from './UserProfileNoTagged.module.css';

export default function UserProfileNoTagged() {
    return (
    <section className={styles.noPosts}>
        <div className={styles.content}>
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>
                    <span className={styles.icon} ><i className="fa-solid fa-camera"></i></span>
                </div>
                <p className={styles.contentText}>No Tagged Photos</p>
            </div>
        </div>
    </section>
    )
}