import React, { useState } from 'react'
import { createContext } from 'react'
export const authContext = createContext()
const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    return (
        <>
            <authContext.Provider value={{ isAuth, setIsAuth, user, setUser }}>
                {children}
            </authContext.Provider>

        </>
    )
}

export default AuthProvider;
