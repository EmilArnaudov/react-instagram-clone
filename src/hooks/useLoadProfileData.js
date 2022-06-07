import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../App";
import { onSnapshot, doc } from 'firebase/firestore'
import { getUserDataWithUsername } from "../services/firestoreService";
import { useLocation } from "react-router-dom";

export default function useLoadProfileData() {
    const { username } = useParams();
    const { db } = useContext(FirebaseContext)

    let location = useLocation();
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let unsub;
        getUserDataWithUsername(db, username)
            .then(user => {
                unsub = onSnapshot(doc(db, "users", user.email), (doc) => {
                    setUserData(doc.data())
                  });
            })


    
          return unsub;
    }, [location])





    return userData;
}