import styles from './Navigation.module.css';
import { CurrentUserContext } from '../../App'

import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({
}) {
    const {userData} = useContext(CurrentUserContext)

    if (!userData) {
        return;
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navItemsContainer}>
                <div className={styles.navSectionLong}>
                    <div className={styles.logoContainer}>
                        <Link to='/'><img className={styles.logo} src="/images/logo.png" alt="" /></Link>
                    </div>
                </div>
                <div className={styles.navSectionShort}>
                    <label htmlFor="search"><i className={["fa-solid", "fa-magnifying-glass", styles.icon].join(' ')}></i></label>
                    <input name='search' id='search' className={styles.searchInput} type="text" placeholder='Search' />
                </div>
                <div className={[styles.navSectionLong, styles.right].join(' ')}>
                    <div className={styles.navMenu}>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/'><i className="fa-solid fa-house"></i></Link>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/guest02'><i className="fa-solid fa-paper-plane"></i></Link>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/'><i className="fa-solid fa-circle-plus"></i></Link>
                        </div>
                        <div className={styles.navMenuIconDiv}>
                            <Link className={styles.link} to='/'><i className="fa-solid fa-heart"></i></Link>
                        </div>
                        <div className={styles.userProfilePic}>
                            <Link className={styles.link} 
                            to={'/' + userData.username}>
                                <img 
                                className={styles.profilePic} 
                                src={userData.profilePic.length > 0 ? userData.profilePic : "/images/defaultPic.jpg"} 
                                alt=""
                                 />
                            </Link>
                        </div>
                    </div>
                </div>          

            </div>
        </nav>
    )
}