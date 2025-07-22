// Common technical skills and keywords for better matching
const TECHNICAL_SKILLS = [
  'javascript', 'python', 'java', 'react', 'node.js', 'sql', 'html', 'css',
  'typescript', 'angular', 'vue', 'express', 'mongodb', 'postgresql', 'mysql',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'jenkins', 'ci/cd',
  'machine learning', 'data science', 'artificial intelligence', 'blockchain',
  'microservices', 'api', 'rest', 'graphql', 'redux', 'webpack', 'babel',
  'testing', 'jest', 'cypress', 'selenium', 'agile', 'scrum', 'devops',
  'linux', 'unix', 'bash', 'shell', 'terraform', 'ansible', 'nginx',
  'redis', 'elasticsearch', 'kafka', 'rabbitmq', 'firebase', 'supabase'
];

const SOFT_SKILLS = [
  'communication', 'leadership', 'teamwork', 'problem solving', 'analytical',
  'creative', 'adaptable', 'organized', 'detail oriented', 'time management',
  'project management', 'collaboration', 'mentoring', 'presentation',
  'negotiation', 'customer service', 'multitasking', 'decision making'
];

export function extractSkills(text: string): string[] {
  const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = cleanText.split(/\s+/);
  const phrases = generatePhrases(cleanText);
  
  const allSkills = [...TECHNICAL_SKILLS, ...SOFT_SKILLS];
  const foundSkills = new Set<string>();
  
  // Check for exact matches
  allSkills.forEach(skill => {
    if (cleanText.includes(skill.toLowerCase())) {
      foundSkills.add(skill);
    }
  });
  
  // Check for partial matches and common variations
  words.forEach(word => {
    allSkills.forEach(skill => {
      if (skill.includes(word) && word.length > 2) {
        foundSkills.add(skill);
      }
    });
  });
  
  return Array.from(foundSkills).sort();
}

function generatePhrases(text: string): string[] {
  const words = text.split(/\s+/);
  const phrases: string[] = [];
  
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i < words.length - 2) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }
  
  return phrases;
}

export function calculateMatchScore(resumeSkills: string[], jobSkills: string[]): {
  matched: string[];
  missing: string[];
  score: number;
} {
  const matched = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => 
      jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(jobSkill.toLowerCase())
    )
  );
  
  const missing = jobSkills.filter(skill => 
    !resumeSkills.some(resumeSkill => 
      resumeSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(resumeSkill.toLowerCase())
    )
  );
  
  const score = jobSkills.length > 0 ? Math.round((matched.length / jobSkills.length) * 100) : 0;
  
  return { matched, missing, score };
}