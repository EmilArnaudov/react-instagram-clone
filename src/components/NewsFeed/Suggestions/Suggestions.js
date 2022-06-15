import styles from './Suggestions.module.css';
import SuggestedUser from '../SuggestedUser/SuggestedUser';

export default function Suggestions({
    users
}) {

    if (users.length === 0) {
        return;
    }

    return (
        <div className={styles.suggestedUsersContainer}>
            {users.map(user => <SuggestedUser key={user.email} user={user}></SuggestedUser>)}
        </div>
    )
}