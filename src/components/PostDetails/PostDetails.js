import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../App';
import { loadPostById } from '../../services/postService';
import styles from './PostDetails.module.css';

export default function PostDetails() {
    const { db } = useContext(FirebaseContext);
    const { postId } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        loadPostById(db, postId)
            .then((postData) => {
                setPost(postData);
            })
    }, [])

    if (!post) {
        return;
    }

    return (
        <>{post.id}</>
    )
}