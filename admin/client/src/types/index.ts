export interface Stat { value: string; label: string; }
export interface NavItem { label: string; href: string; }

export interface PersonalInfo {
  name: string; shortName: string; initials: string;
  title: string; tagline: string; location: string;
  phone: string; email: string; whatsapp: string;
  linkedin: string; experience: string; cvPath: string;
  profileImage: string;
}

export interface HeroData { typewriterTexts: string[]; stats: Stat[]; }
export interface AboutData { paragraphs: string[]; quickStats: Stat[]; }

export interface ExperienceItem {
  _id?: string; title: string; company: string;
  period: string; location: string; description: string[];
}

export interface ExperienceData {
  current: ExperienceItem;
  previous: ExperienceItem[];
}

export interface Certification {
  _id?: string; title: string; issuer: string;
  year: string; icon: string; image: string;
}

export interface Service {
  _id?: string; title: string; description: string;
  icon: string; tags: string[];
}

export interface CaseStudy {
  _id?: string; category: string; title: string;
  problem: string; solution: string; results: string[];
  featured: boolean; image: string;
}

export interface WhyItem { _id?: string; title: string; description: string; }

export interface Plan {
  _id?: string; name: string; price: string; period: string;
  description: string; features: string[]; highlighted: boolean; badge: string;
}

export interface SEOProposalData {
  title: string; subtitle: string; plans: Plan[]; paymentTerms: string[];
}

export interface Settings {
  googleAnalyticsId: string; siteTitle: string; metaDescription: string;
}

export interface SiteContent {
  _id?: string;
  personal: PersonalInfo;
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData;
  certifications: Certification[];
  services: Service[];
  caseStudies: CaseStudy[];
  skills: string[];
  whyWorkWithMe: WhyItem[];
  seoProposal: SEOProposalData;
  navigation: NavItem[];
  settings: Settings;
  lastSaved?: string;
  lastPublished?: string;
}
