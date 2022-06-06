import { doc, getDoc, getDocs } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";

export async function emailValidator(db, email) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailRegexTest = regex.test(email);
    let emailExists = await isEmailTaken(db, email);

    return emailRegexTest && !emailExists;
}

export function passwordValidator(password) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    return regex.test(password);
}

export function fullNameValidator(fullName) {
    let regex = /[A-Z][a-z]+\s[A-Z][a-z]+/
    return regex.test(fullName);
}

export async function usernameValidator(db, username) {
    let regex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/
    let usernameRegexTest = regex.test(username);
    let usernameTaken = await isUsernameTaken(db, username);

    return usernameRegexTest && !usernameTaken;
}


async function isUsernameTaken(db, username) {
    let matches = [];

    const usersRef = collection(db, "users");
    const usernameQuery = query(usersRef, where('username', '==', username))
    const querySnapshot = await getDocs(usernameQuery);
    querySnapshot.forEach(doc => {
        matches.push(doc.data());
    })

    return matches.length > 0;
}

async function isEmailTaken(db, email) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}