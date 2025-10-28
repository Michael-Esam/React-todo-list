import { createContext ,useState, useContext } from "react";
import MySnackbar from "../SnackBar";

 const ToastContext =createContext({});

export const ToastProvider = ({children})=>{
    const [openToast, setOpenToast] =useState(false);
    const [message, setMessage] =useState(false);
    
    const showToast = (message) => {
      setOpenToast(true);
      setMessage(message)
      setTimeout(()=>{
        setOpenToast(false)
      },2000)
    };
    return(
        <ToastContext.Provider value={{showToast}}>
          <MySnackbar openToast={openToast} message={message} />
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    return useContext(ToastContext)
}
