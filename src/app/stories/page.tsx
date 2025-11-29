
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { stories, gurus as allGurus } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BookmarkButton } from "@/components/bookmark-button";

interface GroupedStories {
  [key: string]: typeof stories;
}

function StoriesContent() {
  const searchParams = useSearchParams();
  const guruIdFromQuery = searchParams.get('guruId');
  const selectedGuru = allGurus.find(g => g.id === guruIdFromQuery);

  const storiesToDisplay = guruIdFromQuery
    ? stories.filter(s => s.guruId === guruIdFromQuery)
    : stories;

  if (guruIdFromQuery && selectedGuru) {
    return (
      <section>
        <div className="flex items-center gap-4 mb-8">
          <Link href={`/gurus/${selectedGuru.id}`}>
            <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={selectedGuru.media.images[0].url}
                alt={`Portrait of ${selectedGuru.name}`}
                fill
                className="object-cover"
                data-ai-hint="spiritual master"
              />
            </div>
          </Link>
          <div>
            <p className="text-muted-foreground">Showing stories from</p>
            <Link href={`/gurus/${selectedGuru.id}`}>
              <h2 className="text-3xl font-headline hover:text-primary transition-colors">{selectedGuru.name}</h2>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          {storiesToDisplay.length > 0 ? storiesToDisplay.map(story => (
            <Card key={story.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
                  <BookmarkButton id={story.id} type="story" />
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary/50 pl-4 text-muted-foreground">
                  {story.anecdote}
                </blockquote>
              </CardContent>
            </Card>
          )) : (
            <p className="text-center text-muted-foreground py-8">No stories found for {selectedGuru.name}.</p>
          )}
        </div>
      </section>
    );
  }

  // Original view: Group stories by guru
  const groupedStories = storiesToDisplay.reduce((acc, story) => {
    const guruId = story.guruId || 'unknown';
    if (!acc[guruId]) {
      acc[guruId] = [];
    }
    acc[guruId].push(story);
    return acc;
  }, {} as GroupedStories);

  const guruOrder = [...new Set(storiesToDisplay.map(s => s.guruId).filter(Boolean))];
  const sortedGuruIds = allGurus
    .filter(guru => guruOrder.includes(guru.id))
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort gurus alphabetically
    .map(guru => guru.id);
    
  const unknownStories = groupedStories['unknown'] || [];

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">Sacred Stories</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore {storiesToDisplay.length} timeless anecdotes and tales that illuminate the path of wisdom.
        </p>
      </div>
      
      <div className="space-y-12">
        {sortedGuruIds.map(guruId => {
          const guru = allGurus.find(g => g.id === guruId);
          const storiesForGuru = groupedStories[guruId];

          if (!guru) return null;

          return (
            <section key={guruId}>
              <div className="flex items-center gap-4 mb-6">
                  <Link href={`/gurus/${guru.id}`}>
                      <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image 
                              src={guru.media.images[0].url}
                              alt={`Portrait of ${guru.name}`}
                              fill
                              className="object-cover"
                              data-ai-hint="spiritual master"
                          />
                      </div>
                  </Link>
                  <div>
                    <Link href={`/gurus/${guru.id}`}>
                      <h2 className="text-2xl font-headline hover:text-primary transition-colors">{guru.name}</h2>
                    </Link>
                    <p className="text-muted-foreground">{guru.title}</p>
                  </div>
              </div>
              <div className="space-y-6">
                {storiesForGuru.map(story => (
                  <Card key={story.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                          <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
                          <BookmarkButton id={story.id} type="story" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="border-l-4 border-primary/50 pl-4 text-muted-foreground">
                        {story.anecdote}
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {unknownStories.length > 0 && (
            <section>
                <h2 className="text-2xl font-headline mb-6">More Stories</h2>
                 <div className="space-y-6">
                  {unknownStories.map(story => (
                      <Card key={story.id}>
                      <CardHeader>
                          <div className="flex justify-between items-start">
                              <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
                              <BookmarkButton id={story.id} type="story" />
                          </div>
                      </CardHeader>
                      <CardContent>
                          <blockquote className="border-l-4 border-primary/50 pl-4 text-muted-foreground">
                          {story.anecdote}
                          </blockquote>
                      </CardContent>
                      </Card>
                  ))}
              </div>
            </section>
        )}
      </div>
    </>
  );
}

export default function StoriesPage() {
  return (
    <React.Suspense fallback={<div>Loading stories...</div>}>
      <StoriesContent />
    </React.Suspense>
  );
}
