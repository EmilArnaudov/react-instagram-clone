import styles from './ModalBodyNoImage.module.css';

export default function ModalBodyNoImage({
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop
}) {
    return (
        <div 
            className={styles.dropContainer}
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            >
                <div className={styles.createPostContent}>
                        <div className={styles.createPostImageContainer}>
                            <img className={styles.createPostImage} src="/images/createPostImage.png" alt="image" />
                        </div>
                        <div>
                            <p className={styles.dragPhotoText}>Drag photos here.</p>
                        </div>
                        <div>
                            <button className={styles.selectButton}>Select from computer</button>
                        </div>
                </div>
        </div>
    )
}