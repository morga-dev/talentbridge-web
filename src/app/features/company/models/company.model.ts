import { ApplicationStatus } from '../../../shared/models';

export interface CompanyProfile {
  companyName: string;
  initials: string;
  industry: string;
  description: string;
  email: string;
  phone: number;
  website: string;
  companySize: string;
}

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
