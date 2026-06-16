import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

interface Usuario {
  nombre: string;
  correo: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  nombre = '';
  correo = '';
  usuarios: Usuario[] = [];

  agregar() {
    if (this.nombre.trim() && this.correo.trim()) {
      this.usuarios.push({ nombre: this.nombre.trim(), correo: this.correo.trim() });
      this.nombre = '';
      this.correo = '';
    }
  }
  
  eliminar(index: number) {
    this.usuarios.splice(index, 1);
  }
}