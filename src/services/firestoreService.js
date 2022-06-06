import { doc, setDoc, getDoc, collection, query, getDocs, where } from "firebase/firestore"; 

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
        profilePic: '',
    }

    await setDoc(doc(db, "users", data.email), userModel);
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