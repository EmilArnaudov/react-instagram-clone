import styles from './NewsFeed.module.css';

import Post from '../Post/Post';

export default function NewsFeed() {
    return (
        <main className={styles.main}>
            <div className={styles.contentSection}>
                <div className={styles.postsSection}>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </div>
                <div className={styles.suggestionSection}>

                </div>
            </div>
        </main>
    )
}