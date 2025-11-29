
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { lineages, gurus as allGurus } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Lineages - Guru Parampara',
  description: 'Explore the great spiritual lineages of India, from Advaita Vedanta to Kriya Yoga. Discover the founders, key figures, and philosophies that have shaped these traditions.',
  openGraph: {
    title: 'Spiritual Lineages - Guru Parampara',
    description: 'Explore the great spiritual lineages of India, from Advaita Vedanta to Kriya Yoga.',
    type: 'website',
    url: 'https://your-domain.com/lineages',
  },
};


export default function LineagesPage() {
  const getFounder = (founderId: string) => {
    return allGurus.find(g => g.id === founderId);
  };
  
  const getGurusByLineage = (lineageId: string) => {
    // A simple logic to associate gurus. This can be made more robust if needed.
    return allGurus.filter(g => g.tradition.toLowerCase().includes(lineageId.split('-')[0]));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Spiritual Lineages</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Paths of Wisdom That Have Shaped the Spiritual Destiny of India.
        </p>
      </div>
      <div className="space-y-8">
        {lineages.map((lineage) => {
          const founder = getFounder(lineage.founder);
          const lineageGurus = getGurusByLineage(lineage.id);
          
          return (
            <Card key={lineage.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-card-foreground/5 border-b">
                <CardTitle className="font-headline text-2xl text-primary">{lineage.name}</CardTitle>
                {founder && <CardDescription>Founded or revitalized by {founder.name}</CardDescription>}
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">{lineage.description}</p>
                
                <div>
                  <h3 className="font-semibold mb-3 text-lg font-headline">Key Figures</h3>
                  <div className="flex flex-wrap gap-4">
                    {lineageGurus.map(guru => (
                      <Link href={`/gurus/${guru.id}`} key={guru.id} className="group">
                        <div className="flex items-center gap-3 bg-secondary/50 p-2 rounded-lg hover:bg-secondary transition-colors">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                              src={guru.media.images[0].url}
                              alt={`Portrait of ${guru.name}`}
                              fill
                              className="object-cover"
                              data-ai-hint="spiritual master"
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">{guru.name}</p>
                            <p className="text-xs text-muted-foreground">{guru.title}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
