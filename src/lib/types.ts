export interface Profile {
  id: string;
  full_name: string;
  education_level: string;
  branch: string;
  created_at: string;
  updated_at: string;
}

export interface RoadmapPhase {
  title: string;
  duration: string;
  topics: string[];
  resources: Resource[];
  projects: string[];
  checkpoints: string[];
}

export interface Resource {
  type: 'video' | 'doc' | 'article' | 'tool';
  title: string;
  url: string;
  description: string;
}

export interface Roadmap {
  id: string;
  user_id: string;
  title: string;
  target_role: string;
  current_skill_level: string;
  time_per_day: number;
  total_duration_weeks: number;
  roadmap_data: {
    phases: RoadmapPhase[];
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgressTracking {
  id: string;
  user_id: string;
  roadmap_id: string;
  phase_index: number;
  checkpoint_index: number;
  completed: boolean;
  completed_at?: string;
  notes: string;
  created_at: string;
}

export interface RoadmapInput {
  education_level: string;
  branch: string;
  current_skill_level: string;
  target_role: string;
  time_per_day: number;
}
