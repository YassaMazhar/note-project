import React, { createContext, useState } from 'react'


export let TokenContext = createContext()
export default function TokenProvider({children}) {
    let [token , setToken] = useState(localStorage.getItem('token') || null)

    function logOut (){
        setToken(null)
        localStorage.removeItem('token')
    }
  return <>
    <TokenContext.Provider value={{token , setToken , logOut}}>
        {children}
    </TokenContext.Provider>
  
  
  </>
}
