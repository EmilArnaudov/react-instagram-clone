import styles from './UserProfilePosts.module.css';

import UserPostForGrid from './UserPostForGrid/UserPostForGrid';
import { useContext, useEffect, useState } from 'react';
import { loadPostsById } from '../../services/postService';
import { FirebaseContext } from '../../App';

export default function UserProfilePosts({
    postsIds
}) {
    const { db } = useContext(FirebaseContext);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        loadPostsById(db, postsIds)
            .then(postsData => {
                setPosts(postsData);
            })
    }, []);
    
    if (!posts) {
        return;
    }

    return (
    <section className={styles.userPosts}>
        {posts.map(post => <UserPostForGrid key={Math.random()} post={post}></UserPostForGrid>)}

    </section>
    )
}