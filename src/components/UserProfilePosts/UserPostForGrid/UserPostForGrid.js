import styles from './UserPostForGrid.module.css';

export default function UserPostForGrid() {
    return (
        <div className={styles.postContainer}>
            <a href="">
                <img className={styles.postImage} src="/images/462.png" alt="" />
            </a>
        </div>
    )
}