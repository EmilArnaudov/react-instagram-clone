import styles from './UserProfilePosts.module.css';

import UserPostForGrid from './UserPostForGrid/UserPostForGrid';

export default function UserProfilePosts() {
    return (
    <section className={styles.userPosts}>
        <UserPostForGrid></UserPostForGrid>
        <UserPostForGrid></UserPostForGrid>
        <UserPostForGrid></UserPostForGrid>

        <UserPostForGrid></UserPostForGrid>
        <UserPostForGrid></UserPostForGrid>
        <UserPostForGrid></UserPostForGrid>
    </section>
    )
}