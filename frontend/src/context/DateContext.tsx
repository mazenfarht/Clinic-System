"use client";

import { createContext, useContext, useState } from "react";

type DateContextType = {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

const DateContext = createContext<DateContextType | null>(null);

export function DateProvider({ children }: { children: React.ReactNode }) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error("useDate must be used inside DateProvider");
  }

  return context;
}
