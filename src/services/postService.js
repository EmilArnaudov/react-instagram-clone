import {doc, addDoc, collection, getDoc, query, orderBy, getDocs, limit, updateDoc, arrayUnion} from 'firebase/firestore';
import { updateTaggedPeoplePosts, updateUserPosts, updatePeopleNewsFeeds } from './userService';


export async function createNewPost(db, caption, taggedPeople, location, imageUrl, ownerUsername, ownerProfilePic) {
    const postModel = {
        ownerUsername,
        ownerProfilePic,
        caption,
        taggedPeople,
        location,
        imageUrl,
        likes: [],
        comments: [],
        date: getPostDate(),
        time: Date.now(),
    }

    const postRef = collection(db, "posts");
    const docRef = await addDoc(postRef, postModel);

    updateUserPosts(db, docRef.id, ownerUsername);
    updateTaggedPeoplePosts(db, docRef.id, taggedPeople);
    updatePeopleNewsFeeds(db, docRef.id, ownerUsername)
}


export async function loadNewsFeedPosts(db, email, limitNumberToAdd) {
    let postsIds = [];

    const docRefF = doc(db, 'newsFeeds', email)
    const collectionRef = collection(docRefF, 'posts');
    const q = query(collectionRef, orderBy("time", "desc"), limit(5 + limitNumberToAdd));
    
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            postsIds.push(doc.data())
    });

    return loadPostsById(db, postsIds);
}

export async function loadPostsById(db, postsIds) {
    let posts = [];

    for (const postId of postsIds) {
        let id = postId.postId ? postId.postId : postId; 
        const post = await loadPostById(db, id);
        posts.push(post);
    }

    return posts;
}

export async function loadPostById(db, postId) {
    const docRef = doc(db, 'posts', postId);
    let docSnap = await getDoc(docRef);
    return {...docSnap.data(), id: docSnap.id};
}

export async function addCommentToPost(db, comment, postId) {
    const docRef = doc(db, 'posts', postId);
    return updateDoc(docRef, {comments: arrayUnion(comment)});
}

export async function updatePostLikes(db, username, postId) {
    const docRef = doc(db, 'posts', postId);
    return updateDoc(docRef, {likes: arrayUnion(username)});
}

function getPostDate() {
    let date = new Date()
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
        ];
    
    let month = monthNames[date.getMonth()].toUpperCase();
    let day = date.getUTCDate().toString();

    if (day.length === 1) {
        day = `0${day}`;
    }

    return `${month} ${day}`
}