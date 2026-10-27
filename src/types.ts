export interface Project {
  id: string;
  number: string;
  name: string;
  painHeadline?: string;
  category: string;
  description: string;
  result: string;
  technologies: string[];
  imageUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  specs: { label: string; value: string }[];
  architecture?: {
    nodes: { id: string; label: string; type: 'client' | 'api' | 'db' | 'service' }[];
    edges: { from: string; to: string; label: string }[];
  };
}

export interface Service {
  number: string;
  title: string;
  description: string;
  details: string[];
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  technicalGoal: string;
  artifact: string;
}

export interface Principle {
  statement: string;
  explanation: string;
}
