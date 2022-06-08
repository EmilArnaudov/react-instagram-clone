import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { CurrentUserContext, FirebaseContext } from '../../App';
import { loadPostById } from '../../services/postService';
import styles from './PostDetails.module.css';
import Navigation from '../Navigation/Navigation';
import PostDetailComment from './PostDetailComment/PostDetailComment';

export default function PostDetails() {
    const { db } = useContext(FirebaseContext);
    const { userData } = useContext(CurrentUserContext)
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        loadPostById(db, postId)
            .then((postData) => {
                setPost(postData);
            })
    }, [])

    const [comment, setComment] = useState('');
    const postLiked = false;
    const likePost = () => {

    }

    const onChangeCommentHandler = (e) => {
        setComment(e.target.value);
    }

    const addComment = (e) => {

    }

    if (!post) {
        return;
    }

    return (
        <>
            <section className={styles.container}>
                <Navigation></Navigation>
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
                                        <Link to={'/p/' + post.id}><i className="fa-solid fa-ellipsis"></i></Link>
                                    </div>
                                </div>

                                <div className={styles.comments}>
                                    <ul className={styles.commentsList}>
                                        <PostDetailComment post={post}></PostDetailComment>
                                        <PostDetailComment post={post}></PostDetailComment>
                                        <PostDetailComment post={post}></PostDetailComment>
                                        <PostDetailComment post={post}></PostDetailComment>
                                    </ul>
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
        </>

    )
}