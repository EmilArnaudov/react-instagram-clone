import styles from './Suggestions.module.css';
import SuggestedUser from '../SuggestedUser/SuggestedUser';

export default function Suggestions({

}) {

    return (
        <div className={styles.suggestedUsersContainer}>
            <SuggestedUser></SuggestedUser>
            <SuggestedUser></SuggestedUser>
            <SuggestedUser></SuggestedUser>
            <SuggestedUser></SuggestedUser>
            <SuggestedUser></SuggestedUser>
        </div>
    )
}