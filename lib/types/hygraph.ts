export interface Asset {
  alt?: string;
  height: number;
  url: string;
  width: number;
}

export interface RichText {
  html: string;
  text: string;
}

export interface Project {
  archived: boolean;
  bathrooms?: number;
  bedrooms?: number;
  description?: RichText;
  featured: boolean;
  id: string;
  images: Asset[];
  location: string;
  name: string;
  slug: string;
  sqft?: number;
  testimonialAuthor?: string;
  testimonialQuote?: string;
  year?: number;
}

export interface BlogPost {
  author?: string;
  body?: RichText;
  category: "Design" | "Construction" | "Inspiration" | "Community" | "News";
  excerpt: string;
  featuredImage?: Asset;
  id: string;
  publishedAt: string;
  slug: string;
  title: string;
}

export interface Lot {
  acreage: number;
  address?: string;
  description?: string;
  dimensions?: string;
  features: string[];
  id: string;
  lotNumber: string;
  lotStatus: "AVAILABLE" | "UNDER_CONTRACT" | "SOLD" | "COMING_SOON";
  price?: number;
}

export interface Neighborhood {
  availableLots: number;
  description: string;
  id: string;
  image?: Asset;
  lots: Lot[];
  name: string;
  slug: string;
}

export interface TeamMember {
  bio?: RichText;
  id: string;
  image?: Asset;
  name: string;
  title: string;
}

export interface Testimonial {
  author: string;
  id: string;
  quote: string;
}

export interface Award {
  description: string;
  id: string;
  title: string;
  year: string;
}

export interface ProcessStep {
  description: string;
  id: string;
  number: string;
  title: string;
}

export interface JobOpening {
  department:
    | "CONSTRUCTION"
    | "DESIGN"
    | "PROJECT_MANAGEMENT"
    | "OPERATIONS"
    | "SALES";
  description?: RichText;
  id: string;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
  location: string;
  slug: string;
  summary: string;
  title: string;
}

export interface GreenFeature {
  category: "FEATURED" | "ADDITIONAL";
  description: string;
  id: string;
  pioneeredLocally: boolean;
  sortOrder: number;
  title: string;
}

export interface HeroComponent {
  backgroundImage?: Asset;
  heading: string;
  subheading?: string;
}

export interface SectionComponent {
  body?: RichText;
  heading: string;
  image?: Asset;
  imagePosition: "left" | "right";
}

export interface CtaComponent {
  buttonLink: string;
  buttonText: string;
  heading: string;
}

export interface PageContent {
  cta?: CtaComponent;
  hero?: HeroComponent;
  id: string;
  sections: SectionComponent[];
  slug: string;
}
