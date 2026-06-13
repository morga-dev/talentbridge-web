import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngIf y *ngFor en el HTML
import { FormsModule } from '@angular/forms';   // Para usar [(ngModel)] en los inputs

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Registramos los módulos aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  nombre = '';
  email = '';

  lista: any[] = [];

  agregar() {
    this.lista.push({
      nombre: this.nombre,
      email: this.email
    });

    this.nombre = '';
    this.email = '';
  }

  eliminar(item: any) {
    this.lista = this.lista.filter(x => x !== item);
  }
}