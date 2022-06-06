import { CurrentUserContext } from "../App";
import { useContext, useEffect, useState} from "react";

export default function useIsOwnProfile(visitedUserData) {

    const { userData } = useContext(CurrentUserContext);
    let [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        setIsOwnProfile(userData.email === visitedUserData.email)
    }, [visitedUserData])

    return isOwnProfile


}