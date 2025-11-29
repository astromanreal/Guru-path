
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { gurus } from "@/lib/data";

interface ChosenGuruContextType {
  selectedGuruId: string | null;
  setSelectedGuruId: (id: string | null) => void;
}

const ChosenGuruContext = createContext<ChosenGuruContextType | undefined>(undefined);

export const ChosenGuruProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGuruId, setSelectedGuruIdState] = useState<string | null>(null);
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedGuruId = localStorage.getItem("guru-parampara-chosen-guru");
      if (savedGuruId) {
        setSelectedGuruIdState(savedGuruId);
      }
    } catch (error) {
      console.error("Failed to load chosen guru from localStorage", error);
    } finally {
        setIsInitialized(true);
    }
  }, []);

  const setSelectedGuruId = (id: string | null) => {
    setSelectedGuruIdState(id);
    try {
      if (id) {
        localStorage.setItem("guru-parampara-chosen-guru", id);
        const guru = gurus.find(g => g.id === id);
        if (guru) {
            toast({ title: "Guru Selected", description: `${guru.name} is now your chosen guide.` });
        }
      } else {
        localStorage.removeItem("guru-parampara-chosen-guru");
      }
    } catch (error) {
      console.error("Failed to save chosen guru to localStorage", error);
    }
  };
  
  if (!isInitialized) {
      return null;
  }
  
  return (
    <ChosenGuruContext.Provider value={{ selectedGuruId, setSelectedGuruId }}>
      {children}
    </ChosenGuruContext.Provider>
  );
};

export const useChosenGuru = () => {
  const context = useContext(ChosenGuruContext);
  if (context === undefined) {
    throw new Error("useChosenGuru must be used within a ChosenGuruProvider");
  }
  return context;
};
