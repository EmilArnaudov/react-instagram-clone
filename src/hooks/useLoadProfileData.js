import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../App";

import { getUserDataWithUsername } from "../services/firestoreService";
import { useLocation } from "react-router-dom";

export default function useLoadProfileData() {
    const { username } = useParams();
    const { db } = useContext(FirebaseContext)

    let location = useLocation();
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        getUserDataWithUsername(db, username)
            .then(data => {
                setUserData(data);
            })
    }, [location])





    return userData;
}