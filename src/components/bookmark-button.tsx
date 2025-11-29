"use client";

import { useBookmarks } from "@/components/providers/bookmark-provider";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

type BookmarkType = 'guru' | 'teaching' | 'story';

interface BookmarkButtonProps {
  id: string;
  type: BookmarkType;
}

export function BookmarkButton({ id, type }: BookmarkButtonProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(id, type);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (bookmarked) {
      removeBookmark(id, type);
    } else {
      addBookmark(id, type);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className={bookmarked ? "fill-primary text-primary" : "text-muted-foreground"} />
    </Button>
  );
}
