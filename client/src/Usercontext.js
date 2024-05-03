import { createContext, useState } from "react";

 
export const Usercontext=createContext({});

export function Usercontextprovider({children}){
    const [userinfo,setinfo]=useState('');
    return (
     <Usercontext.Provider value={{userinfo,setinfo}}>
        {children}
     </Usercontext.Provider>
    );
}

