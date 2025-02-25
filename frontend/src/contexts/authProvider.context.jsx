import React,{ createContext, useState } from "react";
import { useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initialUserState = localStorage.getItem("userData");
    
    const [authUser, setAuthUser] = useState(
        initialUserState ? JSON.parse(initialUserState) : undefined
    )

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
           {children}
        </AuthContext.Provider>
    )
} 


export const useAuth = () => useContext(AuthContext);