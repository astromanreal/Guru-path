
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Bot,
  BookOpen,
  Cog,
  Compass,
  Contact,
  GanttChartSquare,
  Home,
  Library,
  MoreVertical,
  Users,
  UserSquare,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useChosenGuru } from '@/components/providers/chosen-guru-provider';
import { gurus } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function GuruNav() {
  const { selectedGuruId } = useChosenGuru();
  const guru = gurus.find(g => g.id === selectedGuruId);

  if (!guru) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="icon">
              <Link href="/settings">
                <UserPlus />
                <span className="sr-only">Choose a Guru</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose a Guru</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src={guru.media.images[0].url} alt={guru.name} />
            <AvatarFallback>{guru.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Your Guru: {guru.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={`/gurus/${guru.id}`} passHref>
              <DropdownMenuItem>
                <UserSquare className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
            </Link>
             <Link href={`/teachings?guruId=${guru.id}`} passHref>
              <DropdownMenuItem>
                <Library className="mr-2 h-4 w-4" />
                <span>View Teachings</span>
              </DropdownMenuItem>
            </Link>
             <Link href={`/stories?guruId=${guru.id}`} passHref>
              <DropdownMenuItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>View Stories</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
       <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          <h1 className="text-2xl font-bold font-headline text-primary">
            Guru Parampara
          </h1>
        </Link>
      <div className="flex items-center gap-4">
        <GuruNav />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Main Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/" passHref>
                <DropdownMenuItem>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/gurus" passHref>
                <DropdownMenuItem>
                  <UserSquare className="mr-2 h-4 w-4" />
                  <span>Gurus</span>
                </DropdownMenuItem>
              </Link>
               <Link href="/lineages" passHref>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Lineages</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/timeline" passHref>
                <DropdownMenuItem>
                  <GanttChartSquare className="mr-2 h-4 w-4" />
                  <span>Timeline</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/teachings" passHref>
                <DropdownMenuItem>
                  <Library className="mr-2 h-4 w-4" />
                  <span>Teachings</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/stories" passHref>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Sacred Stories</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/bookmarks" passHref>
                <DropdownMenuItem>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Bookmarks</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/ai-assistant" passHref>
                <DropdownMenuItem>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>AI Assistant</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/explore" passHref>
                <DropdownMenuItem>
                  <Compass className="mr-2 h-4 w-4" />
                  <span>Explore</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings" passHref>
                <DropdownMenuItem>
                  <Cog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/contact" passHref>
                <DropdownMenuItem>
                  <Contact className="mr-2 h-4 w-4" />
                  <span>Contact</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
