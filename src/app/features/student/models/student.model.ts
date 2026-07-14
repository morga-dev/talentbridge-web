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