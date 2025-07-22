export interface SkillMatch {
  matched: string[];
  missing: string[];
  resumeSkills: string[];
  jobSkills: string[];
  score: number;
}

export interface FileUpload {
  file: File | null;
  content: string;
}