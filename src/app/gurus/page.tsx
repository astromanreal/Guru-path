import { gurus } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore the Great Gurus | Spiritual Masters of India',
  description: 'Meet the enlightened souls who shaped the course of Sanatan Dharma — from Adi Shankaracharya and Ramakrishna to Yogananda and Neem Karoli Baba.',
  keywords: 'Hindu gurus, Indian mystics, Spiritual teachers, Guru Parampara, Bhakti, Yoga, Saints of India, Advaita Vedanta teachers',
  openGraph: {
    title: 'Explore the Great Gurus | Spiritual Masters of India',
    description: 'Discover profiles of masters who shaped Sanatan Dharma.',
    type: 'website',
    url: 'https://your-domain.com/gurus',
  },
};


export default function GurusPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Explore the Masters</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Guiding Lights Across Time – Walk the Timeless Paths of Enlightenment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gurus.map((guru) => (
          <Link href={`/gurus/${guru.id}`} key={guru.id} className="group h-full">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <CardTitle className="font-headline text-primary-foreground absolute bottom-4 left-4 text-2xl text-white">
                    {guru.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-muted-foreground font-semibold">{guru.title}</p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-4">{guru.description}</p>
              </CardContent>
              <CardFooter>
                 <Button variant="link" className="p-0 h-auto">
                    View Profile <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                 </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
