import React, { useContext, useEffect, useState } from "react";
import { getLocalStorage, LS_ARCHIVE, setLocalStorage } from "../utils";

const ArchiveContext = React.createContext([]);
const ArchiveUpdateContext = React.createContext((a) => {
  console.log(a);
});

export function useArchive() {
  return useContext(ArchiveContext);
}

export function useArchiveUpdate() {
  return useContext(ArchiveUpdateContext);
}

export default function ArchiveContextProvider({ children }) {
  const [archive, setArchive] = useState([]);

  // get archive at first render
  useEffect(() => {
    const data = getLocalStorage(LS_ARCHIVE);

    if (data) {
      setArchive(data);
    } else {
      setArchive([]);
      setLocalStorage(LS_ARCHIVE, []);
    }
  }, []);

  return (
    <ArchiveContext.Provider value={archive}>
      <ArchiveUpdateContext.Provider value={(list) => setArchive(list)}>
        {children}
      </ArchiveUpdateContext.Provider>
    </ArchiveContext.Provider>
  );
}
