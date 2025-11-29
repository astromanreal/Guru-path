import { timelineEvents } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Timeline | Chronology of Hindu Mystics',
  description: "Journey through the ages with a chronological timeline of India's greatest gurus and their impact on Sanatan Dharma.",
  keywords: "Hindu timeline, Guru chronology, Indian saints history, Guru Parampara timeline, Vedanta history",
  openGraph: {
    title: 'Spiritual Timeline | Chronology of Hindu Mystics',
    description: 'Explore key events in spiritual history and the lives of great masters.',
    type: 'website',
    url: 'https://your-domain.com/timeline',
  },
};

export default function TimelinePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Spiritual Timeline</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          The river of dharma flows through time, carried by realized souls.
        </p>
      </div>
      <div className="relative border-l-2 border-primary/20 ml-4 pl-8 space-y-12">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[49px] top-1 h-8 w-8 bg-primary rounded-full flex items-center justify-center ring-8 ring-background">
              <GanttChartSquare className="text-primary-foreground h-5 w-5" />
            </div>
            <p className="absolute -left-20 top-2.5 text-sm font-semibold text-primary">{event.year}</p>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <CardTitle className="font-headline">{event.title}</CardTitle>
                  {event.guruId && (
                     <Link href={`/gurus/${event.guruId}`}>
                      <div className="text-sm bg-secondary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        View Details
                      </div>
                     </Link>
                  )}
                </div>
                <CardDescription className="pt-2 text-base text-foreground/80">{event.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
