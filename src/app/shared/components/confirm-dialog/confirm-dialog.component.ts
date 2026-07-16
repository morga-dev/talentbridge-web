import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../models/confirm-dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './confirm-dialog.component.html',
})

export class ConfirmDialogComponent {
  
	private readonly dialogRef = inject<MatDialogRef<ConfirmDialogComponent>>(MatDialogRef);
	protected readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

	protected onConfirm(): void {
		this.dialogRef.close(true);
	}

	protected onCancel(): void {
		this.dialogRef.close(false);
	}
}
