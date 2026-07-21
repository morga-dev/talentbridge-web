export interface StudentProfile {
  fullName: string;
  initials: string;
  career: string;
  university: string;
  semester: string;
  graduationYear: string;
  email: string;
  phone: number;
  skills: string[];
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  applicationsCount: number;
  interviewsCount: number;
}

export interface UpcomingInterview {
  jobTitle: string;
  company: string;
  date: string;
  time: string;
}
