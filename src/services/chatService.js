import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { constructChatID } from "./firestoreService";

export async function createChat(db, user, otherUser) {
    const chatID = constructChatID(user, otherUser);
    const chat = {
        user,
        otherUser,
        id: chatID,
        messages: [],
    }
    const docRef = doc(db, 'chats', chatID);
    setDoc(docRef, chat)

    updateUserChatContacts(db, user, otherUser);
    updateUserChatContacts(db, otherUser, user);
}

export async function doesChatExist(db, user, otherUser) {
    const chatID = constructChatID(user, otherUser);
    const docRef = doc(db, 'chats', chatID);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
}

export async function loadAllChats(db, user) {
    let chats = []

    for (const contactEmail of user.chatContacts) {
        const chatID = constructChatID(user, {email: contactEmail});
        const docRef = doc(db, 'chats', chatID);
        const docSnap = await getDoc(docRef);
        let chat = docSnap.data();
        chat.messages = chat.messages.reverse();
        chats.push(chat);
    }

    return chats;
}

export async function createChatMessage(db, chatID, message, owner) {
    const messageModel = {
        owner: owner.username,
        content: message,
        time: Date.now(),
    }

    const docRef = doc(db, 'chats', chatID);
    updateDoc(docRef, {messages: arrayUnion(messageModel)})
}

function updateUserChatContacts(db, user, otherUser) {
    const docRef = doc(db, 'users', user.email);

    return updateDoc(docRef, {chatContacts: arrayUnion(otherUser.email)});
}

export function formatTimePassed(oldTime) {
    let newTime = Date.now();
    oldTime = Number(oldTime);

    let timeDiff = newTime - oldTime;

    let seconds = Math.floor(timeDiff / 1000);
    if (seconds < 60) {
        return `Now`;
    }

    let minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}min`;

    }

    let hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h`
      ;
    }

    let days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days}d`

    }

    let weeks = Math.floor(days / 7)
    if (weeks < 4) {
        return `${weeks}w`

    }

    let months = Math.floor(weeks / 4)
    if (months < 12) {
        return `${months}mo`
    }

    let years = Math.floor(months / 12);
    return `${years}y`


}