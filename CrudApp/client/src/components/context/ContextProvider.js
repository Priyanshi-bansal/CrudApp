import React, { createContext, useState } from "react";

export const adddata = createContext("");
export const updatedata = createContext("");
export const deletedata = createContext("");



const ContextProvider = ({children}) => {
  const [udata, setUdata] = useState("");
  const [updata, setUpdata] = useState("");
  const [deldata, setDeldata] = useState("");


  return (
    <adddata.Provider value={{ udata, setUdata }}>
        <updatedata.Provider value={{updata, setUpdata}}>
            <deletedata.Provider value={{deldata, setDeldata}}>
            { children }
            </deletedata.Provider>
        
        </updatedata.Provider>
     
    </adddata.Provider>
  );
};

export default ContextProvider;
