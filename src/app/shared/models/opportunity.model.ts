export type Modality = 'Remoto' | 'Híbrido' | 'Presencial';

export type EmploymentType =
  | 'Tiempo completo'
  | 'Medio tiempo'
  | 'Práctica profesional'
  | 'Beca'
  | 'Temporal';

export type OpportunityStatus = 'active' | 'draft' | 'closed' | 'expired';

export type TypeFilter = 'Todas' | 'Vacantes' | 'Becas';

export interface CompanyPreview {
  id: number;
  name: string;
  logoUrl?: string;
  sector: string;
  sizeRange: string;
  foundedYear: number;
  about: string;
}

export interface OpportunitySummary {
  id: number;
  title: string;
  company: string;
  tags: string[];
  location: string;
  modality: Modality;
  salaryRange?: string;
  employmentType?: EmploymentType;
}

export interface OpportunityDetail {
  id: number;
  company: CompanyPreview;
  title: string;
  description: string;
  requirements: string[];
  technologies: string[];
  location: string;
  modality: Modality;
  salaryRange?: string;
  employmentType: EmploymentType;
  createdAt: string;
  expirationDate: string;
  status: OpportunityStatus;
  estimatedApplyMinutes?: number;
}
