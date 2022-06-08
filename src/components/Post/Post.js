import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext, FirebaseContext } from '../../App';
import styles from './Post.module.css';
import { addCommentToPost, updatePostLikes } from '../../services/postService';

export default function Post({
    postData
}) {
    const { db } = useContext(FirebaseContext)
    const { userData } = useContext(CurrentUserContext)
    const [post, setPost] = useState(postData);
    const [comment, setComment] = useState('');
    const [postLiked, setPostLiked] = useState(post.likes.includes(userData.username));

    const likePost = () => {
        if (!postLiked) {
            updatePostLikes(db, userData.username, post.id)

            let newLikes = post.likes;
            newLikes.push(userData.username);
            setPost((oldState) => {
                return {...oldState, likes: newLikes};
            })
            setPostLiked(true);
        }
    }

    const onChangeCommentHandler = (e) => {
        setComment(e.target.value);
    }

    const addComment = (e) => {
        e.preventDefault();

        const commentModel = {
            commentOwner: userData.username,
            commentOwnerProfilePic: userData.profilePic,
            commentContent: comment,
        }

        addCommentToPost(db, commentModel, post.id);

        let newComments = post.comments;
        newComments.push(commentModel);
        setPost((oldState) => {
            return {...oldState, comments: newComments};
        })
        setComment('');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.profilePicContainer}>
                    <img className={styles.profilePic} src={post.ownerProfilePic.length > 0 ? post.ownerProfilePic : "/images/defaultPic.jpg"} alt="" />
                </div>
                <div className={styles.userDetails}>
                    <p className={styles.username}>{post.ownerUsername}</p>
                    <p className={styles.location}>{post.location}</p>
                </div>
                <div className={styles.ellipsisContainer}>
                    <Link to={'/p/' + post.id}><i className="fa-solid fa-ellipsis"></i></Link>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={post.imageUrl} alt="" />
            </div>
            <div className={styles.actions}>
                <span className={postLiked ? styles.likedButton : styles.likeButton} onClick={likePost}><i className="fa-solid fa-heart"></i></span>
                <span><i className="fa-solid fa-comment"></i></span>
            </div>
            <div className={styles.likedBy}>
                {post.likes.length === 0 
                ? <p>Be the <span>first</span> one to like this post.</p>
                : ( post.likes.length === 1 
                    ? <p>Liked by <span>{post.likes[0] === userData.username ? 'You' : post.likes[0]}</span></p>
                    : <p>Liked by <span>{post.likes[0]}</span> and <a href="">{post.likes.length - 1} others</a></p>)}

            </div>
            <div className={styles.commentSection}>
                {
                post.caption.length > 0 
                ?                 
                <div className={styles.firstComment}>
                    <span className={styles.bold}>{post.ownerUsername}</span>
                    <p className={styles.firstCommentText}>{post.caption}</p>
                </div>
                : ''
                }

                {
                    post.comments.length > 3 
                    ?
                    <div className={styles.viewAllComments}>
                        <a href='' className={styles.viewAllCommentsText}>View all {post.comments.length} comments</a>
                    </div>
                    : ''
                }


                {post.comments.length > 0
                ?
                <div className={styles.firstComment}>
                    <span className={styles.bold}>{post.comments[post.comments.length - 1].commentOwner}</span>
                    <p className={styles.lastCommentText}>{post.comments[post.comments.length - 1].commentContent}</p>
                </div>
                :''
                 }


            </div>

            <div className={styles.date}>
                <p className={styles.dateText}>{post.date}</p>
            </div>

                <div className={styles.commentInputContainer}>
                    <form onSubmit={addComment} className={styles.inputForm}>
                        <div className={styles.smileyContainer}>
                            <i className="fa-solid fa-face-smile"></i>
                        </div>
                            <div className={styles.inputFieldContainer}>
                                <input onChange={onChangeCommentHandler} value={comment} placeholder='Add a comment..' type="text" />
                            </div>

                            <button
                                 disabled={comment.length > 0 ? '' : true}
                            >Post</button>
                    </form>
                </div>
        </div>
    )
}