
export interface OldGuru {
  id: string;
  name: string;
  title: string;
  location: string;
  imageUrl: string;
  imageHint: string;
  lifespan: string;
  lineageId: string;
  bio: string;
}

export interface Lineage {
  id: string;
  name:string;
  description: string;
  founder: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  guruId?: string;
}

export interface Teaching {
    id: string;
    title: string;
    topic: string;
    summary: string;
    explanation: string;
    guruId: string;
}

export interface Story {
    id: string;
    title: string;
    guruId: string;
    anecdote: string;
}

export interface Sadhana {
  id: string;
  title: string;
  practice: string;
  quote: string;
  guruId: string;
}

// New Detailed Guru Type
export interface CoreTeaching {
  teaching: string;
  explanation: string;
}

export interface FoundedInstitution {
  name: string;
  description: string;
  mathas?: {
    name: string;
    location: string;
    direction: string;
  }[];
  year?: number;
  location?: string;
}

export interface Legacy {
  movementsFounded?: string[];
  disciples: string[];
  influence?: string[];
}

export interface Book {
  title: string;
  description: string;
}

export interface Iconography {
  traditionalDepiction: string;
  symbols: string[];
}

export interface TimelineHighlight {
  year: string;
  event: string;
}

export interface MediaImage {
  url: string;
  caption: string;
}

export interface MediaVideo {
  title: string;
  url: string;
}

export interface Media {
  images: MediaImage[];
  videoLinks: MediaVideo[];
}

export interface AssociatedFigure {
    name: string;
    role: string;
}

export interface Guru {
  id: string;
  name: string;
  title: string;
  lifespan: string;
  birthplace: string;
  tradition: string;
  description: string;
  coreTeachings: CoreTeaching[];
  foundedInstitutions: FoundedInstitution;
  legacy: Legacy;
  books: Book[];
  quotes: string[];
  iconography: Iconography;
  timelineHighlights: TimelineHighlight[];
  media: Media;
  initiatedBy?: {
    name: string;
    location: string;
    year: string;
  };
  associatedFigures?: AssociatedFigure[];
}
