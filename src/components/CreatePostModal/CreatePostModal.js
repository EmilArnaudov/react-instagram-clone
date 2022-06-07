import styles from './CreatePostModal.module.css';
import Modal from 'react-bootstrap/Modal';

import validateFile from '../../validators/fileValidator';
import ModalBodyNoImage from './ModalBodyNoImage/ModalBodyNoImage';
import { uploadImageAndGetDownloadUrl } from '../../services/firestoreService';

import { useContext, useState } from 'react';
import { FirebaseContext } from '../../App';
import ModalBodyImage from './ModalBodyImage/ModalBodyImage';

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
                {uploadUrl === '' 
                ?<ModalBodyNoImage
                    dragOver={dragOver}
                    dragEnter={dragEnter}
                    dragLeave={dragLeave}
                    fileDrop={fileDrop}
                    uploadUrl={uploadUrl}
                    Modal={Modal}
                    errorMessage={errorMessage}
                ></ModalBodyNoImage>
                : <ModalBodyImage
                    Modal={Modal}
                    imageUrl={uploadUrl}
                    handleClose={handleClose}
                >
                  </ModalBodyImage>}
        </Modal>
    )
}