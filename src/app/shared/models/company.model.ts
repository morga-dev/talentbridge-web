import type { ApplicationStatus } from "./application.model"; 

export interface CompanyProfile {
  id: number;
  name: string;
  logoUrl?: string;
  industry: string;
  about: string;
  sizeRange: string;
  foundedYear: number;
  website?: string;
  email: string;
  phone: number;
  initials?: string;
}

export type CompanyPreview = Pick<
  CompanyProfile,
  'id' | 'name' | 'phone' | 'email' | 'logoUrl' | 'industry' | 'about' | 'sizeRange' | 'foundedYear' | 'website'
>;

export interface CandidateApplicant {
  id: number;
  fullName: string;
  initials: string;
  career: string;
  appliedFor: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface UpcomingCompanyInterview {
  candidateName: string;
  jobTitle: string;
  date: string;
  time: string;
}
