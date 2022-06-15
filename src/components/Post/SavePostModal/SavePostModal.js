import styles from './SavePostModal.module.css';

export default function SavePostModal({
    showSavePost,
    isOwner,
    savePostHandler
}) {

    return (
        <>
            {showSavePost &&         
            <div className={styles.container}>
                <button onClick={savePostHandler} className={styles.save}>Save Post</button>
                {isOwner && <button className={styles.delete}>Delete Post</button>}
            </div>
            }
        </>
    )
}