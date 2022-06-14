import styles from './PostDetailComment.module.css';

export default function PostDetailComment({
    comment,
    modal,
}) {

    if (!comment) {
        return;
    }   

    return (

        <li className={styles.commentContainer}>
            <div className={styles.header}>
                <div className={modal ? styles.profilePicContainerModal : styles.styles.profilePicContainer}>
                    <img className={modal ? styles.profilePicModal : styles.profilePic} src={comment.commentOwnerProfilePic.length > 0 ? comment.commentOwnerProfilePic : "/images/defaultPic.jpg"} alt="" />
                </div>
                <div className={styles.detailsWrapper}>
                    <div className={styles.userDetails}>
                        <span className={styles.username}>{comment.commentOwner}</span>
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