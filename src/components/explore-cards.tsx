
'use client';

import type { Guru, Teaching, Story } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Quote, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { gurus } from "@/lib/data";

export const GuruCard = ({ guru }: { guru: Guru }) => (
  <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <CardHeader className="p-0">
      <div className="relative h-56 w-full">
        <Image
          src={guru.media.images[0].url}
          alt={`Portrait of ${guru.name}`}
          fill
          className="object-cover object-top"
          data-ai-hint="spiritual master"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-2 right-2 z-10">
          <BookmarkButton id={guru.id} type="guru" />
        </div>
        <CardTitle className="font-headline text-primary-foreground absolute bottom-4 left-4 text-2xl text-white">
          {guru.name}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-4 flex-grow">
      <p className="text-sm text-muted-foreground font-semibold">{guru.title}</p>
      {guru.quotes[0] && (
         <blockquote className="mt-2 text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-3">
          "{guru.quotes[0]}"
        </blockquote>
      )}
    </CardContent>
    <CardFooter>
      <Button asChild variant="link" className="p-0 h-auto">
        <Link href={`/gurus/${guru.id}`}>
          View Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export const TeachingCard = ({ teaching }: { teaching: Teaching }) => {
  const guru = gurus.find(g => g.id === teaching.guruId);
  return (
    <Card className="flex flex-col h-full hover:bg-card/95 transition-colors">
       <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 text-primary">
                <BookOpen className="h-6 w-6 flex-shrink-0" />
                <CardTitle className="font-headline text-xl">{teaching.title}</CardTitle>
            </div>
            <BookmarkButton id={teaching.id} type="teaching" />
          </div>
          <Badge variant="outline" className="w-fit">{teaching.topic}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-4">{teaching.summary}</p>
      </CardContent>
      {guru && (
        <CardFooter>
            <p className="text-sm font-semibold text-muted-foreground">
                From: <Link href={`/gurus/${guru.id}`} className="hover:text-primary hover:underline">{guru.name}</Link>
            </p>
        </CardFooter>
      )}
    </Card>
  )
};

export const StoryCard = ({ story }: { story: Story }) => {
  const guru = gurus.find(g => g.id === story.guruId);
  return (
     <Card className="flex flex-col h-full hover:bg-card/95 transition-colors">
       <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 text-primary">
                <Sparkles className="h-6 w-6 flex-shrink-0" />
                <CardTitle className="font-headline text-xl">{story.title}</CardTitle>
            </div>
            <BookmarkButton id={story.id} type="story" />
          </div>
          {guru && <p className="text-sm text-muted-foreground">A story about {guru.name}</p>}
      </CardHeader>
      <CardContent className="flex-grow">
         <blockquote className="border-l-4 border-primary/50 pl-4 text-muted-foreground line-clamp-4">
            {story.anecdote}
          </blockquote>
      </CardContent>
       <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto">
            <Link href="/stories">Read More Stories</Link>
        </Button>
       </CardFooter>
    </Card>
  )
};

export const QuoteCard = ({ quote, guru }: { quote: string; guru: Guru }) => (
    <Card className="flex flex-col h-full justify-center bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <CardContent className="p-6 text-center space-y-4">
            <Quote className="h-8 w-8 text-primary/50 mx-auto" />
            <blockquote className="text-xl italic text-foreground/80">
                "{quote}"
            </blockquote>
            <p className="text-muted-foreground">
                — <Link href={`/gurus/${guru.id}`} className="hover:text-primary hover:underline">{guru.name}</Link>
            </p>
        </CardContent>
    </Card>
);
