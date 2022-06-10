import styles from './PostDetailComment.module.css';

export default function PostDetailComment({
    comment
}) {

    if (!comment) {
        return;
    }   

    return (

        <li className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={styles.profilePicContainer}>
                    <img className={styles.profilePic} src={comment.commentOwnerProfilePic.length > 0 ? comment.commentOwnerProfilePic : "/images/defaultPic.jpg"} alt="" />
                </div>
                <div className={styles.detailsWrapper}>
                    <div className={styles.userDetails}>
                        <span className={styles.username}>{comment.commentOwnerUsername}</span>
                        <span className={styles.commentText}>{comment.commentContent}</span>
                    </div>
                    <div className={styles.commentLeftAgo}>
                        <span>6w</span>
                    </div>
                </div>
            </div>
        </li>

    )
}