import styles from './PostDetailComment.module.css';

export default function PostDetailComment({
    post
}) {

    return (

        <li className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={styles.profilePicContainer}>
                    <img className={styles.profilePic} src={post.ownerProfilePic.length > 0 ? post.ownerProfilePic : "/images/defaultPic.jpg"} alt="" />
                </div>
                <div className={styles.detailsWrapper}>
                    <div className={styles.userDetails}>
                        <span className={styles.username}>{post.ownerUsername}</span>
                        <span className={styles.commentText}>My comment beibeee qjo beibe</span>
                    </div>
                    <div className={styles.commentLeftAgo}>
                        <span>6w</span>
                    </div>
                </div>
            </div>
        </li>

    )
}