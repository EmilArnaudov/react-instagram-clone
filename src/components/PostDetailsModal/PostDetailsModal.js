import Modal from 'react-bootstrap/Modal';
import styles from './PostDetailsModal.module.css';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext, FirebaseContext } from '../../App';
import { addCommentToPost, updatePostLikes } from '../../services/postService';
import PostDetailComment from '../PostDetails/PostDetailComment/PostDetailComment';
import SavePostModal from '../Post/SavePostModal/SavePostModal';

export default function PostDetailsModal({
    show,
    handleClose,
    postData,
}) {


    const { db } = useContext(FirebaseContext);
    const { userData } = useContext(CurrentUserContext)

    const [comment, setComment] = useState('');
    const [postLiked, setPostLiked] = useState(null);
    const [post, setPost] = useState(postData)

    //SavePost
    const [showSavePost, setShowSavePost] = useState(false);
    const openSavePost = () => setShowSavePost(oldState => !oldState);

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

    if (!post || !userData) {
        return;
    }

    if (postLiked === null) {
        setPostLiked(post.likes.includes(userData.username));
    }

    return (
        <Modal
        // contentClassName={styles.mainModal}
        dialogClassName={styles.mainModal}
        show={show} 
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Body
                className={styles.body}
            >
                <section className={styles.container}>
                    <main className={styles.main}>
                        <div className={styles.innerWrapper}>
                            <div className={styles.postContent}>
                                <div className={styles.postImageContainer}>
                                    <img src={post.imageUrl} alt="" />
                                </div>
                                <div className={styles.commentSection}>
                                    <div className={styles.header}>
                                        <div className={styles.profilePicContainer}>
                                            <img className={styles.profilePic} src={post.ownerProfilePic.length > 0 ? post.ownerProfilePic : "/images/defaultPic.jpg"} alt="" />
                                        </div>
                                        <div className={styles.userDetails}>
                                            <p className={styles.username}>{post.ownerUsername}</p>
                                            <p className={styles.location}>{post.location}</p>
                                        </div>
                                        <div className={styles.ellipsisContainer}>
                                            <span onClick={openSavePost}><i className="fa-solid fa-ellipsis"></i></span>
                                        </div>
                                        <SavePostModal isOwner={userData.username === post.ownerUsername} showSavePost={showSavePost}></SavePostModal>
                                    </div>

                                    <div className={styles.comments}>
                                        <ul className={styles.commentsList}>
                                            {post.comments.map(comment => <PostDetailComment modal={true} key={Math.random()} comment={comment}></PostDetailComment>)}
                                        </ul>
                                    </div>

                                    <div className={styles.actions}>
                                        <span className={post.likes.includes(userData.username) ? styles.likedButton : styles.likeButton} onClick={likePost}><i className="fa-solid fa-heart"></i></span>
                                        <span><i className="fa-solid fa-comment"></i></span>
                                    </div>

                                    <div className={styles.likedBy}>
                                        {post.likes.length === 0 
                                        ? <p>Be the <span>first</span> one to like this post.</p>
                                        : ( post.likes.length === 1 
                                            ? <p>Liked by <span>{post.likes[0] === userData.username ? 'You' : post.likes[0]}</span></p>
                                            : <p>Liked by <span>{post.likes[0]}</span> and <a href="">{post.likes.length - 1} others</a></p>)}

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
                            </div>
                        </div>
                    </main>
                </section>
            </Modal.Body>
        </Modal>
    )
}