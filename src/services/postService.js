import {doc, addDoc, collection} from 'firebase/firestore'

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
        date: getPostDate()
    }

    const postRef = collection(db, "posts");
    const docSnap = await addDoc(postRef, postModel);

    console.log(docSnap);
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