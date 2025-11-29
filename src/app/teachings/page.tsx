
'use client';

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { teachings, gurus as allGurus } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookmarkButton } from "@/components/bookmark-button";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeachingsPage() {
  const searchParams = useSearchParams();
  const guruIdFromQuery = searchParams.get('guruId');

  const [searchTerm, setSearchTerm] = useState("");
  const allTopics = [...new Set(teachings.map(t => t.topic))].sort();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const guruFilterFromQuery = useMemo(() => {
    if (!guruIdFromQuery) return null;
    return allGurus.find(g => g.id === guruIdFromQuery) || null;
  }, [guruIdFromQuery]);

  const filteredTeachings = useMemo(() => {
    return teachings
      .filter(t => {
        // Apply guru filter from URL query first
        if (guruIdFromQuery) {
          return t.guruId === guruIdFromQuery;
        }
        return true;
      })
      .filter(t => {
        // Then apply topic filter
        if (selectedTopic) {
          return t.topic === selectedTopic;
        }
        return true;
      })
      .filter(t => {
        // Finally apply search term
        const guru = allGurus.find(g => g.id === t.guruId);
        const searchTermLower = searchTerm.toLowerCase();
        if (searchTermLower === "") return true;
        return (
          t.title.toLowerCase().includes(searchTermLower) ||
          t.summary.toLowerCase().includes(searchTermLower) ||
          t.topic.toLowerCase().includes(searchTermLower) ||
          (guru && guru.name.toLowerCase().includes(searchTermLower))
        );
      });
  }, [guruIdFromQuery, selectedTopic, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BookOpen className="h-16 w-16 text-primary mb-4 mx-auto" />
        <h1 className="text-4xl font-headline font-bold">Discover Teachings</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore a searchable archive of {teachings.length} core spiritual concepts from the great masters.
        </p>
      </div>
      
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for a teaching, topic, or guru..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search Teachings"
          />
        </div>
        
        {/* Hide topic filter when filtering by a specific guru from the nav */}
        {!guruFilterFromQuery && (
            <div className="flex flex-wrap gap-2 items-center justify-center">
                <Badge 
                    role="button"
                    tabIndex={0}
                    aria-pressed={!selectedTopic}
                    variant={!selectedTopic ? "default" : "secondary"}
                    onClick={() => setSelectedTopic(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedTopic(null)}
                    className="cursor-pointer transition-colors text-base py-1 px-3"
                >
                    All Topics
                </Badge>
                {allTopics.map(topic => (
                    <Badge 
                    key={topic}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedTopic === topic}
                    variant={selectedTopic === topic ? "default" : "secondary"}
                    onClick={() => setSelectedTopic(topic)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedTopic(topic)}
                    className="cursor-pointer transition-colors text-base py-1 px-3"
                    >
                    {topic}
                    </Badge>
                ))}
            </div>
        )}

        {guruFilterFromQuery && (
          <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-muted-foreground">
                  Showing teachings from <span className="font-bold text-primary">{guruFilterFromQuery.name}</span>.
                  <Button variant="link" asChild className="ml-2">
                    <Link href="/teachings">Clear filter</Link>
                  </Button>
              </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachings.map(teaching => {
          const guru = allGurus.find(g => g.id === teaching.guruId);
          return (
            <Card key={teaching.id} className="flex flex-col hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{teaching.title}</CardTitle>
                    <Badge variant="outline">{teaching.topic}</Badge>
                  </div>
                  <div className="flex-shrink-0">
                    <BookmarkButton id={teaching.id} type="teaching" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">{teaching.summary}</p>
              </CardContent>
              <CardFooter className="flex-col items-start space-y-4">
                {guru && (
                  <p className="text-sm text-muted-foreground">
                    From: <Link href={`/gurus/${guru.id}`} className="font-semibold text-primary/80 hover:text-primary hover:underline">{guru.name}</Link>
                  </p>
                )}
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={`/teachings/${teaching.id}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {filteredTeachings.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No teachings found.</p>
              <p>Try broadening your search criteria.</p>
          </div>
      )}
    </div>
  );
}
