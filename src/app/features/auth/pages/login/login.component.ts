import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
	CommonModule,
	ReactiveFormsModule,
	MatIconModule,
	PageHeaderComponent
],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private router: Router,
  ) {}

  // Bandera para ocultar/mostrar la contraseña dinámicamente
  hidePassword = true;

  // Formulario reactivo con validaciones iniciales básicas
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] })
  });

  // Alternar visibilidad de contraseña
  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Ejecución al enviar el formulario
  onSubmit(): void {
    if (this.loginForm.valid) {
      // Forzamos el tipado seguro usando la interfaz LoginRequest
      const loginData: LoginRequest = this.loginForm.getRawValue();
      
      console.log('Datos enviados:', loginData);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Métodos rápidos para autenticación externa de ejemplo
  loginWithGoogle(): void {
    console.log('Iniciando sesión con Google...');
  }

  loginWithLinkedIn(): void {
    console.log('Iniciando sesión con LinkedIn...');
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}