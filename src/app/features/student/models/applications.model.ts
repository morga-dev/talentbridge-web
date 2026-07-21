import { ApplicationStatus, ApplicationType } from '../../../shared/models';

export interface ApplicationStatusStep {
  status: ApplicationStatus;
  label: string;
  date: string | null;
}

export interface Application {
  id: number;
  type: ApplicationType;
  title: string;
  company: string;
  requirements: string[];
  modality: string;
  date: string;
  status: ApplicationStatus;
}

export interface ApplicationDetail extends Application {
  description: string;
  responsibilities: string[];
  benefits: string[];
  salaryRange: string | null;
  publishedDate: string;
  deadlineDate: string;
  appliedDate: string;
  companyInitials: string;
  companyDescription: string;
  companyWebsite: string;
  statusHistory: ApplicationStatusStep[];
}
