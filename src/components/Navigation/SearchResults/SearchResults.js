import SearchResult from './SearchResult/SearchResult';
import styles from './SearchResults.module.css';

export default function SearchResults({
    showSearchResults,
    users,
}) {

    let containerClasses = showSearchResults ? [styles.container, styles.show].join(' ') : [styles.container, styles.hide].join(' ')

    return (
        <div className={containerClasses}>
            {users.map(user => <SearchResult user={user}></SearchResult>)}
        </div>
    )
}