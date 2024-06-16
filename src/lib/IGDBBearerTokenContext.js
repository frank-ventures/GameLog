"use client";
import { createContext, useEffect, useState } from "react";
import GetBearerToken from "./IGDBBearerToken";

export const BearerContext = createContext();

export function BearerProvider({ children }) {
  const [bearer, setBearer] = useState("");

  useEffect(() => {
    const newBearerToken = async () => {
      const newToken = await GetBearerToken();
      setBearer(newToken);
    };
    newBearerToken();
  }, []);

  return (
    <BearerContext.Provider value={[bearer, setBearer]}>
      {children}
    </BearerContext.Provider>
  );
}
