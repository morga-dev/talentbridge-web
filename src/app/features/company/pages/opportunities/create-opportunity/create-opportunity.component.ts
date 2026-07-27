import { Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmDialogComponent } from '../../../../../shared/components';
import type { ConfirmDialogData, EmploymentType, Modality } from '../../../../../shared/models';

@Component({
  selector: 'app-create-opportunity',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './create-opportunity.component.html'
})
export class CreateOpportunityComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);

  readonly submitting = signal(false);
  // Guardamos requisitos, tecnologías y condiciones en un solo arreglo
  readonly requirementsList = signal<string[]>([]);

  readonly employmentTypes: EmploymentType[] = [
    'Tiempo completo', 
    'Medio tiempo', 
    'Práctica profesional', 
    'Beca', 
    'Temporal'
  ];

  readonly modalities: Modality[] = ['Remoto', 'Híbrido', 'Presencial'];

  readonly opportunityForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    employmentType: ['' as EmploymentType, [Validators.required]],
    modality: ['' as Modality, [Validators.required]],
    location: ['', [Validators.required]],
    salaryRange: [''],
    description: ['', [Validators.required, Validators.minLength(20)]],
    expirationDate: ['', [Validators.required]],
    estimatedApplyMinutes: [5]
  });

  // Agregar requisito/tecnología a la lista
  addRequirement(input: HTMLInputElement): void {
    const value = (input.value || '').trim();
    if (value && !this.requirementsList().includes(value)) {
      this.requirementsList.update(current => [...current, value]);
      input.value = '';
    }
  }

  // Eliminar requisito
  removeRequirement(req: string): void {
    this.requirementsList.update(current => current.filter(r => r !== req));
  }

  // Descartar cambios
  goBack(): void {
    if (this.opportunityForm.dirty || this.requirementsList().length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Descartar cambios',
          message: 'Tienes cambios sin guardar. ¿Deseas descartarlos y salir?',
          confirmText: 'Descartar',
          confirmColor: 'warn',
          cancelText: 'Seguir editando',
          icon: 'edit_note'
        } as ConfirmDialogData
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.opportunityForm.reset();
          this.requirementsList.set([]);
          this.location.back();
        }
      });
    } else {
      this.location.back();
    }
  }

  // Confirmar publicación
  onSubmit(): void {
    if (this.opportunityForm.invalid) {
      this.opportunityForm.markAllAsTouched();
      return;
    }

    if (this.requirementsList().length === 0) {
      this.snackBar.open('Agrega al menos un requisito o tecnología clave', 'Entendido', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Publicar oportunidad',
        message: '¿Estás seguro de publicar esta oportunidad? Estará disponible para los estudiantes inmediatamente.',
        confirmText: 'Publicar',
        confirmColor: 'primary',
        cancelText: 'Revisar',
        icon: 'publish'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.publishOpportunity();
      }
    });
  }

  private publishOpportunity(): void {
    this.submitting.set(true);

    const payload = {
      title: this.opportunityForm.value.title,
      description: this.opportunityForm.value.description,
      requirements: this.requirementsList().join('\n'), 
      location: this.opportunityForm.value.location,
      modality: this.opportunityForm.value.modality,
      salary_range: this.opportunityForm.value.salaryRange || null,
      employment_type: this.opportunityForm.value.employmentType,
      expiration_date: this.opportunityForm.value.expirationDate,
      status: 1
    };

    setTimeout(() => {
      this.submitting.set(false);
      this.opportunityForm.reset();
      this.requirementsList.set([]);
      this.snackBar.open('Oportunidad publicada con éxito', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.router.navigate(['/company/dashboard']);
    }, 1000);
  }

  get f() {
    return this.opportunityForm.controls;
  }
}
