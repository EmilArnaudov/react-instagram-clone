import {doc, updateDoc, arrayUnion, collection, addDoc, arrayRemove, getDocs, getDoc} from 'firebase/firestore'
import { getUserDataWithUsername } from './firestoreService'

export async function followUser(db, currentUser, followedUser) {
    const docRefcurrentUser = doc(db, "users", currentUser.email);
    const docReffollowedUser = doc(db, "users", followedUser.email);
    await Promise.all([updateDoc(docRefcurrentUser, {following: arrayUnion(followedUser.email)}),
                        updateDoc(docReffollowedUser, {followers: arrayUnion(currentUser.email)})])

}

export async function unFollowUser(db, currentUser, followedUser) {
    const docRefcurrentUser = doc(db, "users", currentUser.email);
    const docReffollowedUser = doc(db, "users", followedUser.email);
    await Promise.all([updateDoc(docRefcurrentUser, {following: arrayRemove(followedUser.email)}),
                        updateDoc(docReffollowedUser, {followers: arrayRemove(currentUser.email)})])

}

export async function updateUserData(db, email, fullName, description, phoneNumber, gender) {
    const docRef = doc(db, 'users', email);
    await updateDoc(docRef, {fullName: fullName, description: description, phoneNumber: phoneNumber, gender: gender});
}

export async function updateUserPosts(db, postId, username) {
    const userData = await getUserDataWithUsername(db, username);

    const docRef = doc(db, "users", userData.email);
    updateDoc(docRef, {ownPosts: arrayUnion(postId)})
}

export async function updateTaggedPeoplePosts(db, postId, taggedPeople) {
    for (const person of taggedPeople) {
        const docRef = doc(db, "users", person.email);
        updateDoc(docRef, {taggedPosts: arrayUnion(postId)})
    }
}

export async function updatePeopleNewsFeeds(db, postId, username) {
    const userData = await getUserDataWithUsername(db, username);

    for (const user of userData.followers) {
        const collectionRef = collection(db, 'newsFeeds', user, 'posts');
        await addDoc(collectionRef, {postId, time: Date.now()})
    }
}

export async function loadSuggestedUsers(db, userData) {
    let followers = userData.followers;
    let following = userData.following;
    let suggestionIds = [];
    let suggestedUsers = [];

    followers.forEach((followed) => {
        if (!following.includes(followed)) {
            suggestionIds.push(followed);
        }
    })

    for (const id of suggestionIds) {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        suggestedUsers.push(docSnap.data());
    }

    return suggestedUsers;

}

export async function searchUsersInDb(db, query) {
    let result = [];
    let docRef = collection(db, 'users');
    let docSnap = await getDocs(docRef);
    docSnap.forEach(doc => result.push(doc.data()));

    return result.filter(
        user => 
        user.username.toLowerCase().includes(query.toLowerCase()) 
        || user.email.toLowerCase().includes(query.toLowerCase())
        || user.fullName.toLowerCase().includes(query.toLowerCase()));
}