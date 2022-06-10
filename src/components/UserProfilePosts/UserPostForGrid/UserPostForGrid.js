import { useState } from 'react';
import styles from './UserPostForGrid.module.css';

export default function UserPostForGrid({
    post
}) {

    const [showLikes, setShowLikes] = useState(false);

    const onMouseOverHandler = () => {
        setShowLikes(oldState => !oldState);
    }

    const showLikesClasses = [styles.likesAndComments, styles.show].join(' ');
    const hideLikesClasses = [styles.likesAndComments, styles.hide].join(' ');

    return (
        <div className={styles.postContainer}>
            <div onMouseEnter={onMouseOverHandler} onMouseLeave={onMouseOverHandler} className={styles.background}>
                <div className={showLikes ? showLikesClasses : hideLikesClasses}>
                    <div className={styles.likes}><span className={styles.icon}><i className="fa-solid fa-heart"></i></span>{post.likes.length}</div>
                    <div className={styles.comments}><span className={styles.icon}><i className="fa-solid fa-comment"></i></span>{post.comments.length}</div>
                </div>
            </div>

            <a href="">
                <img className={styles.postImage} src={post.imageUrl} alt="" />
            </a>
        </div>
    )
}