import { createContext, useEffect, useState } from "react"
import axios from "axios"

const url = import.meta.env.VITE_URL

export const GlobalContext = createContext();

function GlobalProvider({ children }) {

  const [sendGetRequest, setSendGetRequest] = useState(false)

  const value = {
    setSendGetRequest,
    sendGetRequest
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;