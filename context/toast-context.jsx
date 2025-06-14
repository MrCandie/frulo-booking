import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, toastType }}>
      {children}
    </ToastContext.Provider>
  );
};
