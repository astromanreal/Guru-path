
import { teachings, gurus as allGurus } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teaching = teachings.find(t => t.id === params.id);
  const guru = teaching ? allGurus.find(g => g.id === teaching.guruId) : undefined;

  if (!teaching) {
    return {
      title: 'Teaching Not Found',
    };
  }

  return {
    title: `${teaching.title} | ${guru?.name || 'Teachings'}`,
    description: teaching.summary,
    keywords: [teaching.title, teaching.topic, guru?.name, 'Spiritual Teachings', 'Guru Parampara'].join(', '),
    openGraph: {
      title: `${teaching.title} | ${guru?.name || 'Guru Parampara'}`,
      description: teaching.summary,
      type: 'article',
      url: `https://your-domain.com/teachings/${teaching.id}`,
    },
  };
}

export default function TeachingDetailPage({ params }: { params: { id: string } }) {
  const teaching = teachings.find(t => t.id === params.id);

  if (!teaching) {
    notFound();
  }

  const guru = allGurus.find(g => g.id === teaching.guruId);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
       <div className="relative">
            <Button asChild variant="outline" className="absolute -top-4 left-0">
              <Link href="/teachings">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Teachings
              </Link>
            </Button>
        </div>

      <Card>
        <CardHeader className="space-y-4">
            <div className="flex justify-between items-start">
                <Badge variant="default" className="text-base">{teaching.topic}</Badge>
                <BookmarkButton id={teaching.id} type="teaching" />
            </div>
          <CardTitle className="font-headline text-4xl text-primary">{teaching.title}</CardTitle>
          {guru && (
             <CardDescription className="flex items-center gap-2 pt-2">
                <User className="h-4 w-4"/> 
                A teaching from <Link href={`/gurus/${guru.id}`} className="font-semibold text-foreground hover:text-primary hover:underline">{guru.name}</Link>
             </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6 text-lg/relaxed">
            <div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Summary</h3>
                <p className="italic">{teaching.summary}</p>
            </div>
            <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><BookOpenCheck className="text-primary"/> Full Teaching</h3>
                <p>{teaching.explanation}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
