import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterStudentRequest, RegisterCompanyRequest } from '../../models/auth.model'; 
import { PageHeaderComponent } from '../../../../shared/components';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
	PageHeaderComponent
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  // Bandera para alternar entre Estudiante y Compañía
  isCompanyMode = false;

  // Unificamos todos los campos necesarios en un solo FormGroup reactivo
  registerForm = new FormGroup({
    // Campos necesarios/comúnes
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required, Validators.pattern('^[0-9]+$')] }),

    // Campos Estudiante
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    university: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    career: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    semester: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    graduationYear: new FormControl<Date | null>(null),
    skills: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cvUrl: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    githubUrl: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    linkedinUrl: new FormControl(''),

    // Campos Compañía
    companyName: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
    website: new FormControl('', { nonNullable: true }),
    industry: new FormControl('', { nonNullable: true }),
    companySize: new FormControl('', { nonNullable: true }),
    logoUrl: new FormControl(''),

    // Términos locales
    acceptTerms: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  });

  ngOnInit(): void {
    // Configuramos los validadores iniciales basados en modo Estudiante
    this.updateFormValidators();
  }

  // Cambiar de rol y actualizar validaciones para que el formulario no quede bloqueado/inválido
  setRegisterMode(isCompany: boolean): void {
    this.isCompanyMode = isCompany;
    this.updateFormValidators();
  }

  private updateFormValidators(): void {
    const studentFields = ['firstName', 'lastName', 'university', 'career', 'semester', 'skills', 'cvUrl', 'githubUrl'];
    const companyFields = ['companyName', 'description', 'website', 'industry', 'companySize'];

    if (this.isCompanyMode) {
      // Remover validadores de estudiante
      studentFields.forEach(field => {
        this.registerForm.get(field)?.clearValidators();
        this.registerForm.get(field)?.updateValueAndValidity();
      });
      // Añadir validadores de compañía
      companyFields.forEach(field => {
        this.registerForm.get(field)?.setValidators([Validators.required]);
        this.registerForm.get(field)?.updateValueAndValidity();
      });
    } else {
      // Añadir validadores de estudiante
      studentFields.forEach(field => {
        this.registerForm.get(field)?.setValidators([Validators.required]);
        this.registerForm.get(field)?.updateValueAndValidity();
      });
      // Remover validadores de compañía
      companyFields.forEach(field => {
        this.registerForm.get(field)?.clearValidators();
        this.registerForm.get(field)?.updateValueAndValidity();
      });
    }
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, acceptTerms, ...formValues } = this.registerForm.getRawValue();

      if (this.isCompanyMode) {
        const companyData: RegisterCompanyRequest = {
          email: formValues.email,
          password: formValues.password,
          phone: Number(formValues.phone),
          companyName: formValues.companyName,
          description: formValues.description,
          website: formValues.website,
          industry: formValues.industry,
          companySize: formValues.companySize,
          logoUrl: formValues.logoUrl ? formValues.logoUrl : undefined
        };
        console.log('Enviando perfil de Compañía a TalentBridge:', companyData);
        // this.authService.registerCompany

      } else {
        const studentData: RegisterStudentRequest = {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
          phone: Number(formValues.phone),
          university: formValues.university,
          career: formValues.career,
          semester: formValues.semester,
          skills: formValues.skills,
          cvUrl: formValues.cvUrl,
          githubUrl: formValues.githubUrl,
          linkedinUrl: formValues.linkedinUrl ? formValues.linkedinUrl : undefined,
          graduationYear: formValues.graduationYear ? new Date(formValues.graduationYear) : undefined
        };
        console.log('Enviando perfil de Estudiante a TalentBridge:', studentData);
        // this.authService.registerStudent
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}