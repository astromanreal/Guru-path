
import { gurus, teachings, stories } from "@/lib/data";
import type { Guru, Teaching, Story } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Quote, User, Sparkles, Compass } from "lucide-react";
import type { Metadata } from 'next';
import { Badge } from "@/components/ui/badge";
import { GuruCard, TeachingCard, StoryCard, QuoteCard } from "@/components/explore-cards";

export const metadata: Metadata = {
  title: 'Explore Spiritual Wisdom | Guru Parampara',
  description: 'Discover a rich feed of gurus, teachings, stories, and quotes. Let serendipity guide you to the wisdom you seek from India’s great masters.',
  openGraph: {
    title: 'Explore Spiritual Wisdom | Guru Parampara',
    description: 'A dynamic discovery feed of spiritual content.',
    type: 'website',
    url: 'https://your-domain.com/explore',
  },
};

type FeedItem = 
  | { type: 'guru'; data: Guru }
  | { type: 'teaching'; data: Teaching }
  | { type: 'story'; data: Story }
  | { type: 'quote'; data: { quote: string; guru: Guru } };

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function ExplorePage() {
  const guruItems: FeedItem[] = gurus.map(data => ({ type: 'guru', data }));
  const teachingItems: FeedItem[] = teachings.map(data => ({ type: 'teaching', data }));
  const storyItems: FeedItem[] = stories.map(data => ({ type: 'story', data }));
  const quoteItems: FeedItem[] = gurus.flatMap(guru => guru.quotes.map(quote => ({ type: 'quote', data: { quote, guru } })));

  const combinedFeed = shuffleArray([...guruItems, ...teachingItems, ...storyItems, ...quoteItems]);

  const featuredGuru = gurus[Math.floor(Math.random() * gurus.length)];

  return (
    <div className="space-y-12">
        <div className="text-center">
            <Compass className="h-16 w-16 text-primary mb-4 mx-auto" />
            <h1 className="text-4xl font-headline font-bold">Explore Wisdom</h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Discover a serendipitous collection of masters, teachings, and sacred stories from the heart of Sanatan Dharma.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {combinedFeed.map((item, index) => {
                        switch (item.type) {
                            case 'guru':
                                return <GuruCard key={`guru-${index}`} guru={item.data} />;
                            case 'teaching':
                                return <TeachingCard key={`teaching-${index}`} teaching={item.data} />;
                            case 'story':
                                return <StoryCard key={`story-${index}`} story={item.data} />;
                            case 'quote':
                                return <QuoteCard key={`quote-${index}`} quote={item.data.quote} guru={item.data.guru} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
                <Card className="sticky top-20 shadow-lg border-primary/20">
                     <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Sparkles className="text-primary"/>
                            Guru of the Day
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden">
                         <Image
                            src={featuredGuru.media.images[0].url}
                            alt={`Portrait of ${featuredGuru.name}`}
                            fill
                            className="object-cover object-top"
                            data-ai-hint="spiritual master"
                            unoptimized
                        />
                       </div>
                       <div className="text-center">
                            <h3 className="text-2xl font-headline font-bold text-primary">{featuredGuru.name}</h3>
                            <p className="text-muted-foreground text-sm">{featuredGuru.title}</p>
                       </div>
                       <p className="text-sm text-muted-foreground line-clamp-3">{featuredGuru.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <Link href={`/gurus/${featuredGuru.id}`}>View Full Profile <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
