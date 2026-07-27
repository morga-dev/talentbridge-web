import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private snackBar = inject(MatSnackBar);

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  readonly contactInfo = [
    { icon: 'mail', label: 'Correo', value: 'd.morga.dev@gmail.com' },
    { icon: 'phone', label: 'Teléfono', value: '+52 962 123 4567' }
  ];

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    this.snackBar.open('Mensaje enviado con éxito. Te contactaremos pronto.', 'Cerrar', {
      duration: 4000, horizontalPosition: 'center', verticalPosition: 'top'
    });
    this.contactForm.reset();
  }
}
