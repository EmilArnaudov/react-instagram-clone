import styles from './UserProfile.module.css';

import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import UserProfilePosts from '../UserProfilePosts/UserProfilePosts';
import UserProfileNoPosts from '../UserProfileNoPosts/UserProfileNoPosts';
import { useContext } from 'react';
import { CurrentUserContext } from '../../App';

export default function UserProfile() {
    const { userData } = useContext(CurrentUserContext);

    if (!userData) {
        return;
    }

    return (
         <section className={styles.section}>
            <Navigation></Navigation>
            <main className={styles.main}>
                <div className={styles.innerWrap}>
                    <header className={styles.header}>
                        <div className={styles.userProfileContainer}>
                            <div className={styles.userProfilePictureContainer}>
                                <div className={styles.labelPicContainer}>
                                    <label  htmlFor="profilePic">
                                        <img className={styles.profilePic} src="/images/defaultPic.jpg" alt="" />
                                    </label>
                                </div>
                                <input className={styles.profilePicInput} name='profilePic' id='profilePic' type="file" />
                            </div>
                            <div className={styles.userDetails}>
                                <div className={styles.usernameAndAction}>
                                    <span className={styles.username}>{userData.username}</span>
                                    <button  className={styles.editProfileBtn}>Edit Profile</button>
                                </div>
                                <div className={styles.activityDetails}>
                                    <span className={styles.posts}><span className={styles.bold}>{userData.ownPosts.length}</span> posts</span>
                                    <span className={styles.followers}><span className={styles.bold}>{userData.followers.length}</span> followers</span>
                                    <span className={styles.following}><span className={styles.bold}>{userData.following.length}</span> following</span>
                                </div>
                                <div className={styles.fullNameContainer}>
                                    <p className={styles.bold}>{userData.fullName}</p>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className={styles.contentNavigator}>
                        <div className={[styles.contentNavigatorDiv, styles.active].join(' ')}>
                            <span className={styles.spanActive}><i className="fa-solid fa-table-cells"></i>POSTS</span>
                        </div>
                        <div className={styles.contentNavigatorDiv}>
                            <span><i className="fa-solid fa-bookmark"></i>SAVED</span>
                        </div>
                        <div className={styles.contentNavigatorDiv}>
                            <span><i className="fa-solid fa-image-portrait"></i>TAGGED</span>
                        </div>
                    </div>

                    <UserProfileNoPosts></UserProfileNoPosts>
                </div>
            </main>
            <div className={styles.footerContainer}>
                <Footer></Footer>
            </div>
        </section>
    )
}