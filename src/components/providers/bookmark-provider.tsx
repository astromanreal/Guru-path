"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

type BookmarkType = 'guru' | 'teaching' | 'story';
type BookmarkItem = { id: string; type: BookmarkType };

interface BookmarkContextType {
  bookmarks: BookmarkItem[];
  addBookmark: (id: string, type: BookmarkType) => void;
  removeBookmark: (id:string, type: BookmarkType) => void;
  isBookmarked: (id: string, type: BookmarkType) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("guru-parampara-bookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (updatedBookmarks: BookmarkItem[]) => {
    try {
      localStorage.setItem("guru-parampara-bookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage", error);
    }
  };
  
  const addBookmark = (id: string, type: BookmarkType) => {
    const newBookmarks = [...bookmarks, { id, type }];
    setBookmarks(newBookmarks);
    updateLocalStorage(newBookmarks);
    toast({ title: "Bookmarked!", description: "Saved to your collection." });
  };

  const removeBookmark = (id: string, type: BookmarkType) => {
    const newBookmarks = bookmarks.filter(b => !(b.id === id && b.type === type));
    setBookmarks(newBookmarks);
    updateLocalStorage(newBookmarks);
    toast({ title: "Removed Bookmark", description: "Removed from your collection." });
  };
  
  const isBookmarked = (id: string, type: BookmarkType) => {
    return bookmarks.some(b => b.id === id && b.type === type);
  };
  
  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
