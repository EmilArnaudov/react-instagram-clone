import styles from './Post.module.css';

export default function Post() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.profilePicContainer}>
                    <img className={styles.profilePic} src="/images/defaultPic.jpg" alt="" />
                </div>
                <div className={styles.userDetails}>
                    <p className={styles.username}>the username</p>
                    <p className={styles.location}>the location</p>
                </div>
                <div className={styles.ellipsisContainer}>
                <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.image} src="/images/462.png" alt="" />
            </div>
            <div className={styles.actions}>
                <a href=""><i className="fa-solid fa-heart"></i></a>
                <a href=""><i className="fa-solid fa-comment"></i></a>
            </div>
            <div className={styles.likedBy}>
                <p>Liked by <span>mmarrin</span> and <a href="">52 others</a></p>
            </div>
            <div className={styles.commentSection}>
                <div className={styles.firstComment}>
                    <span className={styles.bold}>the username</span>
                    <p className={styles.firstCommentText}>sum random shit b</p>
                </div>
                <div className={styles.viewAllComments}>
                    <a href='' className={styles.viewAllCommentsText}>View all 102 comments</a>
                </div>
                <div className={styles.firstComment}>
                    <span className={styles.bold}>the commenter</span>
                    <p className={styles.lastCommentText}>yes my boy</p>
                </div>
            </div>

            <div className={styles.date}>
                <p className={styles.dateText}>JANUARY 21</p>
            </div>

            <div className={styles.commentInputContainer}>
                    <form className={styles.inputForm}>
                        <div className={styles.smileyContainer}>
                            <i className="fa-solid fa-face-smile"></i>
                        </div>
                        <div className={styles.inputFieldContainer}>
                            <input placeholder='Add a comment..' type="text" />
                        </div>

                        <button>Post</button>
                    </form>
                </div>
        </div>
    )
}