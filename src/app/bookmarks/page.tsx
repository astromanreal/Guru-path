
"use client";

import { useBookmarks } from "@/components/providers/bookmark-provider";
import { stories, teachings, gurus as allGurus } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookmarkX } from "lucide-react";
import Image from "next/image";

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  const bookmarkedGurus = bookmarks
    .filter(b => b.type === 'guru')
    .map(b => allGurus.find(g => g.id === b.id))
    .filter((g): g is NonNullable<typeof g> => g !== undefined);

  const bookmarkedTeachings = bookmarks
    .filter(b => b.type === 'teaching')
    .map(b => teachings.find(t => t.id === b.id))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);
    
  const bookmarkedStories = bookmarks
    .filter(b => b.type === 'story')
    .map(b => stories.find(s => s.id === b.id))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-headline font-bold mb-4">Your Bookmarks</h1>
        <p className="text-muted-foreground">You haven't bookmarked anything yet.</p>
        <Button asChild className="mt-6">
          <Link href="/explore">Start Exploring</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-headline font-bold">Your Bookmarks</h1>
      
      {bookmarkedGurus.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline mb-4">Gurus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedGurus.map(guru => (
              <Card key={guru.id} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={guru.media.images[0].url} alt={guru.name} fill className="object-cover" data-ai-hint="spiritual master" />
                  </div>
                  <CardTitle className="font-headline text-lg">{guru.name}</CardTitle>
                </CardHeader>
                <CardFooter className="mt-auto flex justify-between items-center">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/gurus/${guru.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); removeBookmark(guru.id, 'guru'); }}>
                    <BookmarkX className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {bookmarkedTeachings.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline mb-4">Teachings</h2>
          <div className="space-y-4">
            {bookmarkedTeachings.map(teaching => (
              <Link href={`/teachings/${teaching.id}`} key={teaching.id} className="block hover:bg-secondary/50 rounded-lg">
                <Card>
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <CardTitle className="font-headline">{teaching.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{teaching.topic}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); removeBookmark(teaching.id, 'teaching'); }}>
                      <BookmarkX className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bookmarkedStories.length > 0 && (
        <section>
          <h2 className="text-2xl font-headline mb-4">Stories</h2>
          <div className="space-y-4">
            {bookmarkedStories.map(story => (
              <Card key={story.id}>
                <CardHeader className="flex flex-row justify-between items-start">
                  <CardTitle className="font-headline">{story.title}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => removeBookmark(story.id, 'story')}>
                    <BookmarkX className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-primary/50 pl-4 text-sm text-muted-foreground">
                    {story.anecdote}
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
