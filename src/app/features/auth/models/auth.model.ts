export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  university: string;
  career: string;
  semester: string;
  graduationYear?: Date;
  skills: string;
  cvUrl: string;
  linkedinUrl?: string;
  githubUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RegisterCompanyRequest {
  email: string;
  password: string;
  phone: number;
  companyName: string;
  description: string;
  website: string;
  industry: string;
  companySize: string;
  logoUrl?: string;
  createdAt?: Date;
  updateAt?: Date;
}