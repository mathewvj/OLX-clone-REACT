
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { app } from '../firebase/config.js'
import { createContext, useState } from "react";
export const FirebaseContext = createContext(null)
export const PostContext = createContext(null)

function PostView({children}){
    const [postDetails, setPostDetails] = useState()
    const auth = getAuth(app)
    const db = getFirestore(app)

    return (
        <FirebaseContext.Provider value={{ auth, db}}>
        <PostContext.Provider value={{postDetails, setPostDetails}}>
            {children}
        </PostContext.Provider>
        </FirebaseContext.Provider>
    )
}

export default PostView