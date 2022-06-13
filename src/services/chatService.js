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
        chats.push(docSnap.data());
    }

    return chats;
}

function updateUserChatContacts(db, user, otherUser) {
    const docRef = doc(db, 'users', user.email);

    return updateDoc(docRef, {chatContacts: arrayUnion(otherUser.email)});
}