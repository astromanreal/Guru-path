import { gurus as allGurus } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookmarkButton } from "@/components/bookmark-button";
import { BookOpenCheck, ChevronRight, CircleDot, GraduationCap, Group, Landmark, Milestone, Mountain, Quote, Sparkles, University, Video, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guru = allGurus.find(g => g.id === params.slug);

  if (!guru) {
    return {
      title: 'Guru Not Found',
    };
  }

  const keywords = [guru.name, guru.tradition, ...guru.coreTeachings.map(t => t.teaching), 'Guru Parampara', 'Indian Saint', 'Spiritual Master'].join(', ');

  return {
    title: `${guru.name} | ${guru.title}`,
    description: guru.description,
    keywords: keywords,
    openGraph: {
      title: `${guru.name} | ${guru.title}`,
      description: guru.description,
      type: 'profile',
      url: `https://your-domain.com/gurus/${guru.id}`,
      images: [
        {
          url: guru.media.images[0].url,
          alt: `Portrait of ${guru.name}`,
        },
      ],
      profile: {
        firstName: guru.name.split(' ')[0],
        lastName: guru.name.split(' ').slice(1).join(' '),
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guru.name} | ${guru.title}`,
      description: guru.description,
      images: [guru.media.images[0].url],
    }
  };
}

export default function GuruProfilePage({ params }: { params: { slug: string } }) {
  const guruIndex = allGurus.findIndex(g => g.id === params.slug);

  if (guruIndex === -1) {
    notFound();
  }

  const guru = allGurus[guruIndex];
  const prevGuru = guruIndex > 0 ? allGurus[guruIndex - 1] : null;
  const nextGuru = guruIndex < allGurus.length - 1 ? allGurus[guruIndex + 1] : null;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": guru.name,
    "alternateName": guru.title,
    "description": guru.description,
    "image": guru.media.images[0].url,
    "url": `https://your-domain.com/gurus/${guru.id}`,
    "jobTitle": "Spiritual Master",
    "birthPlace": {
      "@type": "Place",
      "name": guru.birthplace
    },
    "knowsAbout": guru.coreTeachings.map(t => t.teaching),
    "worksFor": {
      "@type": "Organization",
      "name": guru.tradition
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://your-domain.com/gurus/${guru.id}`
    }
  };


  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <div className="relative h-[75vh] bg-secondary">
          <Image
            src={guru.media.images[0].url}
            alt={`Portrait of ${guru.name}`}
            fill
            className="object-cover object-top"
            data-ai-hint="spiritual master"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <div className="absolute top-4 left-4 z-10">
            <Button asChild variant="outline" className="bg-background/50 backdrop-blur-sm border-none">
              <Link href="/gurus">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Gurus
              </Link>
            </Button>
          </div>
        </div>
        <CardHeader className="relative -mt-20 z-10 border-b bg-background/80 backdrop-blur-sm rounded-t-xl pb-4">
           <div className="absolute top-4 right-4">
            <BookmarkButton id={guru.id} type="guru" />
          </div>
          <p className="text-sm text-muted-foreground">{guru.tradition}</p>
          <CardTitle className="font-headline text-4xl md:text-5xl text-primary">{guru.name}</CardTitle>
          <CardDescription className="text-lg pt-1">{guru.title}</CardDescription>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground pt-2 text-sm">
            <span>{guru.lifespan}</span>
            {guru.birthplace && (
              <span className="flex items-center gap-1.5"><Landmark className="h-4 w-4" /> {guru.birthplace}</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6 text-lg/relaxed bg-background/80 backdrop-blur-sm">
          <p>{guru.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader><CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-primary"/>Core Teachings</CardTitle></CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {guru.coreTeachings.map((item, index) => (
                   <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-base font-semibold">{item.teaching}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.explanation}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

           <Card>
            <CardHeader><CardTitle className="font-headline flex items-center gap-2"><BookOpenCheck className="text-primary"/>Major Works</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {guru.books.map((book, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-muted-foreground text-sm">{book.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        
         <Card>
            <CardHeader><CardTitle className="font-headline flex items-center gap-2"><Quote className="text-primary"/>Inspiring Quotes</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {guru.quotes.map((quote, index) => (
                <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-lg text-muted-foreground">
                  {quote}
                </blockquote>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle className="font-headline flex items-center gap-2 text-xl"><Milestone className="text-primary"/>Timeline</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {guru.timelineHighlights.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CircleDot className="h-4 w-4 mt-1.5 text-primary/50 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">{item.year}</p>
                                    <p className="text-sm text-muted-foreground">{item.event}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline flex items-center gap-2 text-xl"><Group className="text-primary"/>Legacy</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-sm">
                   <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><GraduationCap /> Disciples</h3>
                        <p className="text-muted-foreground">{guru.legacy.disciples.join(', ')}</p>
                    </div>
                     {guru.legacy.movementsFounded && guru.legacy.movementsFounded.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><University /> Movements Founded</h3>
                        <p className="text-muted-foreground">{guru.legacy.movementsFounded.join(', ')}</p>
                      </div>
                    )}
                </CardContent>
            </Card>

             {guru.id === 'adi-shankaracharya' && guru.foundedInstitutions.mathas && (
                <Card>
                <CardHeader><CardTitle className="font-headline flex items-center gap-2 text-xl"><Mountain className="text-primary"/>The Four Mathas</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{guru.foundedInstitutions.description}</p>
                     <ul className="space-y-2">
                        {guru.foundedInstitutions.mathas.map((matha) => (
                            <li key={matha.name} className="text-sm">
                                <span className="font-semibold">{matha.name}</span> ({matha.direction}) - {matha.location}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                </Card>
            )}

            {guru.media.videoLinks.length > 0 && (
                <Card>
                    <CardHeader><CardTitle className="font-headline flex items-center gap-2 text-xl"><Video className="text-primary"/>Learn More</CardTitle></CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <a href={guru.media.videoLinks[0].url} target="_blank" rel="noopener noreferrer">
                                Watch: {guru.media.videoLinks[0].title}
                                <ChevronRight className="ml-2 h-4 w-4"/>
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>


      <div className="flex justify-between items-center py-8">
        {prevGuru ? (
          <Button asChild variant="outline">
            <Link href={`/gurus/${prevGuru.id}`}>
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              {prevGuru.name}
            </Link>
          </Button>
        ) : <div />}
        {nextGuru ? (
          <Button asChild variant="outline">
            <Link href={`/gurus/${nextGuru.id}`}>
              {nextGuru.name}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : <div />}
      </div>
    </div>
    </>
  );
}
