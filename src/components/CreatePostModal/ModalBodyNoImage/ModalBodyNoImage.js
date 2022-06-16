import styles from './ModalBodyNoImage.module.css';

export default function ModalBodyNoImage({
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
    Modal,
    errorMessage,
    fileSelect
}) {
    return (
        <>
        <Modal.Header className={styles.modalHeading} >
            <h1>Create new post</h1>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
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
                            <label className={styles.selectButton} htmlFor="file">
                                Select from computer
                            </label>
                            <input onChange={fileSelect} className={styles.hidden} type="file" name='file' id='file'/>
                        </div>
                </div>
            </div>
                {errorMessage === '' 
                ? ''
                :
                <div className={styles.error}>
                    <p>{errorMessage}</p>
                </div>
            }
            </Modal.Body>
        </>
    )
}

