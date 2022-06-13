import { doc, setDoc, getDoc, collection, query, getDocs, where, updateDoc } from "firebase/firestore"; 
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export async function addNewUserToDatabase(db, data) {
    const userModel = {
        email: data.email,
        username: data.username,
        fullName: data.fullName,
        description: '',
        followers: [],
        following: [],
        ownPosts: [],
        savedPosts: [],
        taggedPosts: [],
        chatContacts: [],
        profilePic: '',
    }

    const newsFeed = {
        ownerEmail: data.email,
        posts: [],
    }

    await Promise.all([setDoc(doc(db, "users", data.email), userModel), setDoc(doc(db, "newsFeeds", data.email), userModel)]);
}


export async function getUserDataWithEmail(db, email) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function getUserDataWithUsername(db, username) {
    let matches = [];

    const usersRef = collection(db, "users");
    const usernameQuery = query(usersRef, where('username', '==', username))
    const querySnapshot = await getDocs(usernameQuery);
    querySnapshot.forEach(doc => {
        matches.push(doc.data());
    })

    return matches[0];
}

export async function updateUserProfilePic(db, email, url) {
    const docRef = doc(db, "users", email);
    updateDoc(docRef, {profilePic: url});
}

export async function uploadImageAndGetDownloadUrl(storage, file) {
    let fileRef = ref(storage, Date.now() + '.png');
    const snapshot = await uploadBytes(fileRef, file);
    let url = await getDownloadURL(snapshot.ref);
    return url;
}

export function constructChatID(user, otherUser) {
    let firstLetter = user.email[0];
    let secondLetter = otherUser.email[0]

    let sum = 0;
    let idString;
    if (firstLetter.charCodeAt(0) < secondLetter.charCodeAt(0)) {
        idString = user.email + otherUser.email;
    } else {
        idString = otherUser.email + user.email; 
    }


    for (let i = 0; i < idString.length; i++) {
        sum += idString.charCodeAt(i);
        sum *= 2
        sum -= 30
    }

    return String(sum);

}