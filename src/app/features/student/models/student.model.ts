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

export type ApplicationType = 'Vacante' | 'Beca';

export type ApplicationStatus = 'aplicado' | 'entrevista' | 'aceptada' | 'rechazada';

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

export type TypeFilter = 'Todas' | 'Vacantes' | 'Becas';

export interface ApplicationStatusStep {
    status: ApplicationStatus;
    label: string;
    date: string | null;
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
