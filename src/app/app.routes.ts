import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
];