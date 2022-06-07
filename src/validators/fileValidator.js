export default function validateFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}