import { doc, getDoc } from "firebase/firestore";

export async function emailValidator(db, email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailRegexTest = regex.test(email);
    let emailExists = await isEmailTaken(db, email);

    return emailRegexTest && emailExists;
}

async function isEmailTaken(db, email) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}

export function passwordValidator(password) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return regex.test(password);
}

export function fullNameValidator(fullName) {
    let regex = /[A-Z][a-z]+\s[A-Z][a-z]+/
    return regex.test(fullName);
}