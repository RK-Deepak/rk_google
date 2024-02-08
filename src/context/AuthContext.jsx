import { createContext, useContext, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>
{
    const [authobj,setauthobj]=useState(null);

    return <AuthContext.Provider value={{authobj,setauthobj}}>
        {children}
    </AuthContext.Provider>
}
export default function Authuser()
{
    return useContext(AuthContext);
}