import {doc, addDoc, collection} from 'firebase/firestore';
import { updateTaggedPeoplePosts, updateUserPosts } from './userService';


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
}


export async function loadNewsFeedPosts() {
    let arr = []
    arr.length = 6;
    arr.fill(1);
    return arr 
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
    let day = date.getDay().toString();

    if (day.length === 1) {
        day = `0${day}`;
    }

    return `${month} ${day}`
}