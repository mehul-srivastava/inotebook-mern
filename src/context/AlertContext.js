import React, { createContext, useState } from "react";

const AlertContext = createContext();
export default AlertContext;

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ type: "Type", message: "Message" });

  const toggleAlert = (type, message) => {
    setAlert({
      ...alert,
      type,
      message,
    });
    setTimeout(
      () =>
        setAlert({
          ...alert,
          type: "Type",
          message: "Message",
        }),
      1500
    );
  };

  return (
    <AlertContext.Provider value={{ alert, toggleAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
