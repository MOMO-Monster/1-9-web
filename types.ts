
export enum ProjectCategory {
  BRANDING = 'branding',
  LOGO = 'logo',
  CAMPAIGN = 'campaign',
  ILLUSTRATION = 'illustration'
}

export interface StatItem {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: string;
}

export interface ChartData {
  name: string;
  before: number;
  after: number;
}

export interface ProjectBlock {
  type: 'text' | 'image' | 'stats' | 'video' | 'gallery';
  content?: string;
  src?: string;
  alt?: string;
  statsData?: StatItem[];
  chartData?: ChartData[];
  galleryImages?: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  client: string;
  year: string;
  coverImage: string;
  summary: string;
  tags: string[];
  blocks: ProjectBlock[];
  // New property to simulate large number of images without bloating data file
  mockImageCount?: number; 
}

export interface CategoryDef {
  id: ProjectCategory;
  title: string; // English
  subtitle: string; // Chinese
  description: string;
  coverImage: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  active: boolean;
}

// Updated interface for the new Capabilities page structure
export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  icon?: string; // Optional icon
  modalImage: string; // The large flowchart/structure image
  modalContent: string; // The descriptive text in the modal
}
