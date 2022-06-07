import styles from './CreatePostModal.module.css';
import Modal from 'react-bootstrap/Modal';

import validateFile from '../../validators/fileValidator';
import ModalBodyNoImage from './ModalBodyNoImage/ModalBodyNoImage';
import { uploadImageAndGetDownloadUrl } from '../../services/firestoreService';

import { useContext, useState } from 'react';
import { FirebaseContext } from '../../App';

export default function CreatePostModal({
    show,
    handleClose,
}) {
    const {storage} = useContext(FirebaseContext)
    const [uploadUrl, setUploadUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const dragOver = (e) => {
        e.preventDefault();
    }
    
    const dragEnter = (e) => {
        e.preventDefault();
    }
    
    const dragLeave = (e) => {
        e.preventDefault();
    }
    
    const fileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }

    const handleFile = async (file) => {
        const isFileValid = validateFile(file);
        if (isFileValid) {
            const url = await uploadImageAndGetDownloadUrl(storage, file);
            setUploadUrl(url);
        } else {
            setErrorMessage('File type is not allowed!')
        }
    }

    return (
        <Modal
            contentClassName={styles.mainModal}
            show={show} 
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className={styles.modalHeading} >
            <h1>Create new post</h1>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
                {uploadUrl === '' 
                ?<ModalBodyNoImage
                    dragOver={dragOver}
                    dragEnter={dragEnter}
                    dragLeave={dragLeave}
                    fileDrop={fileDrop}
                    uploadUrl={uploadUrl}
                ></ModalBodyNoImage>
                : 'imageUploaded'}
            {/* <div 
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
            </div> */}
            {errorMessage === '' 
            ? ''
            :
            <div className={styles.error}>
                <p>{errorMessage}</p>
            </div>
        }
            
            </Modal.Body>
        </Modal>
    )
}