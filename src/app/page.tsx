
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { gurus, sadhanas } from "@/lib/data";
import { ArrowRight, BookOpen, Bot, Quote, Users, Compass, HeartHandshake, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import type { Guru, Sadhana } from '@/types';
import { useChosenGuru } from '@/components/providers/chosen-guru-provider';

type DailyQuote = {
  quote: string;
  guru: Guru;
};

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const { selectedGuruId } = useChosenGuru();
  const [dailyQuote, setDailyQuote] = React.useState<DailyQuote | null>(null);
  const [dailySadhana, setDailySadhana] = React.useState<Sadhana | null>(null);

  React.useEffect(() => {
    // Select Daily Quote
    const allQuotes: DailyQuote[] = gurus.flatMap(guru => 
      guru.quotes.map(quote => ({ quote, guru }))
    );
    if (allQuotes.length > 0) {
      const quoteIndex = Math.floor(Math.random() * allQuotes.length);
      setDailyQuote(allQuotes[quoteIndex]);
    }

    // Select Daily Sadhana
    let sadhanaPool = sadhanas;
    if (selectedGuruId) {
      const guruSadhanas = sadhanas.filter(s => s.guruId === selectedGuruId);
      if (guruSadhanas.length > 0) {
        sadhanaPool = guruSadhanas;
      }
    }
    if (sadhanaPool.length > 0) {
      const sadhanaIndex = Math.floor(Math.random() * sadhanaPool.length);
      setDailySadhana(sadhanas[sadhanaIndex]);
    }
  }, [selectedGuruId]);

  const sadhanaGuru = dailySadhana ? gurus.find(g => g.id === dailySadhana.guruId) : null;

  return (
    <div className="space-y-16">
      <section className="relative text-center bg-card p-8 md:p-16 rounded-xl shadow-sm overflow-hidden border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">
            Guru Parampara
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The Eternal Lineage of Spiritual Masters
          </p>
          <p className="mt-4 text-base text-muted-foreground max-w-3xl mx-auto">
            Explore the sacred lives, profound teachings, and timeless stories of India's greatest saints and sages.
          </p>
        </div>
      </section>

      <section className="text-center">
        <Compass className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-headline font-bold">Begin Your Journey of Discovery</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let serendipity guide you. Our Explore feed is a dynamic collection of masters, teachings, and sacred stories designed to inspire your spiritual path.
        </p>
        <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/explore">Explore the Feed <ArrowRight className="ml-2" /></Link>
            </Button>
        </div>
      </section>

      {dailySadhana && sadhanaGuru && (
        <section>
           <div className="text-center mb-8">
            <h2 className="text-3xl font-headline font-bold">Sadhana of the Day</h2>
          </div>
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-secondary/30 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <HeartHandshake className="h-7 w-7 text-primary" />
                <span className='font-headline text-2xl'>{dailySadhana.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-foreground/90">{dailySadhana.practice}</p>
              <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground">
                "{dailySadhana.quote}"
              </blockquote>
            </CardContent>
             <CardFooter className="flex justify-end">
                <p className="text-sm text-muted-foreground">
                    Inspired by <Link href={`/gurus/${sadhanaGuru.id}`} className="font-semibold hover:text-primary hover:underline">{sadhanaGuru.name}</Link>
                </p>
            </CardFooter>
          </Card>
        </section>
      )}

      {dailyQuote && (
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-headline font-bold">Wisdom for Today</h2>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <Quote className="h-8 w-8 text-primary/50 mx-auto" />
              <blockquote className="text-xl italic text-foreground/80">
                "{dailyQuote.quote}"
              </blockquote>
              <p className="text-muted-foreground">
                — <Link href={`/gurus/${dailyQuote.guru.id}`} className="hover:text-primary hover:underline">{dailyQuote.guru.name}</Link>
              </p>
            </CardContent>
          </Card>
        </section>
      )}

      <section>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-headline font-bold">Explore the Masters</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                Guiding Lights Across Time – Walk the Timeless Paths of Enlightenment.
            </p>
        </div>
        <Carousel 
          plugins={[plugin.current]}
          opts={{ align: "start", loop: true }}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {gurus.map((guru) => (
              <CarouselItem key={guru.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                <Link href={`/gurus/${guru.id}`} className="group h-full">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0">
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={guru.media.images[0].url}
                          alt={`Portrait of ${guru.name}`}
                          fill
                          className="object-cover object-top"
                          data-ai-hint="spiritual master"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                         <CardTitle className="font-headline text-primary-foreground absolute bottom-4 left-4 text-2xl text-white">
                           {guru.name}
                         </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex-grow">
                      <p className="text-sm text-muted-foreground font-semibold">{guru.title}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="link" className="p-0 h-auto text-sm">
                            View Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </CardFooter>
                  </Card>
                </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col justify-between p-6">
            <div>
              <CardTitle className="font-headline flex items-center gap-2"><BookOpen /> Sacred Stories</CardTitle>
              <p className="text-muted-foreground mt-2">
                Delve into inspiring anecdotes and tales from the lives of great masters.
              </p>
            </div>
            <div className="mt-4">
                <Button asChild variant="outline">
                    <Link href="/stories">Read Stories <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
          </Card>
          <Card className="flex flex-col justify-between p-6">
            <div>
              <CardTitle className="font-headline flex items-center gap-2"><Bot /> AI Assistant</CardTitle>
              <p className="text-muted-foreground mt-2">
                Have a spiritual question? Get answers based on timeless teachings from our AI assistant.
              </p>
            </div>
            <div className="mt-4">
                <Button asChild variant="outline">
                    <Link href="/ai-assistant">Ask a Question <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>
          </Card>
      </section>
    </div>
  );
}
