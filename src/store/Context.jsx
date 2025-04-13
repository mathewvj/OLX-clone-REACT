import React,{ createContext, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { app } from '../firebase/config.js'

export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)

export default function Context ({children}) {

    const [user, setUser] = useState(null)

    const auth = getAuth(app)
    const db = getFirestore(app)
    
    
    return (
        <FirebaseContext.Provider value={{ auth, db}}>
        <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider>
      </FirebaseContext.Provider>
    
    )
};