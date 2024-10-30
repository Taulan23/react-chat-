import React, { createContext, useState, useEffect, useContext } from "react";
import { getMainAccount, saveMainAccount as saveMainAccountToStorage, mainAccount as initialMainAccount } from "../data";

const MainAccountContext = createContext();

export const MainAccountProvider = ({ children }) => {
  const [mainAccount, setMainAccount] = useState(() => {
    const storedMainAccount = getMainAccount();
    if (!storedMainAccount) {
      saveMainAccountToStorage(initialMainAccount);
      return initialMainAccount;
    }
    return storedMainAccount;
  });

  const saveMainAccount = () => {
    saveMainAccountToStorage(mainAccount);
  };

  return (
    <MainAccountContext.Provider value={{ mainAccount, setMainAccount, saveMainAccount }}>
      {children}
    </MainAccountContext.Provider>
  );
};

export const useMainAccount = () => useContext(MainAccountContext);
