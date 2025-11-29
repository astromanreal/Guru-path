import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { BookmarkProvider } from "@/components/providers/bookmark-provider";
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ChosenGuruProvider } from '@/components/providers/chosen-guru-provider';

export const metadata: Metadata = {
  title: {
    default: 'Guru Parampara | Eternal Lineages of Sanatan Dharma',
    template: '%s | Guru Parampara',
  },
  description: "Explore the sacred lives, teachings, and stories of great Hindu masters from ancient to modern times. Dive deep into India's spiritual heritage.",
  keywords: "Guru Parampara, Hindu Masters, Adi Shankaracharya, Indian spirituality, Bhakti saints, Advaita Vedanta, Kriya Yoga, Mystic gurus, Hinduism app",
  openGraph: {
    title: 'Guru Parampara | Eternal Lineages of Sanatan Dharma',
    description: "Explore the sacred lives, teachings, and stories of great Hindu masters from ancient to modern times.",
    type: 'website',
    url: 'https://your-domain.com',
    siteName: 'Guru Parampara',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guru Parampara | Eternal Lineages of Sanatan Dharma',
    description: "Explore the sacred lives, teachings, and stories of great Hindu masters.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <BookmarkProvider>
            <ChosenGuruProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                  {children}
                </main>
              </div>
              <Toaster />
            </ChosenGuruProvider>
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
