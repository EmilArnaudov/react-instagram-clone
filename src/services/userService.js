import {doc, updateDoc, arrayUnion} from 'firebase/firestore'

export async function followUser(db, currentUser, followedUser) {
    const docRefcurrentUser = doc(db, "users", currentUser.email);
    const docReffollowedUser = doc(db, "users", followedUser.email);
    await Promise.all([updateDoc(docRefcurrentUser, {following: arrayUnion(followedUser.email)}),
                        updateDoc(docReffollowedUser, {followers: arrayUnion(currentUser.email)})])


}