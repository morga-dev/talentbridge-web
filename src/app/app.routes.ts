import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent : () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
    },
    {
        path : 'login',
        loadComponent : () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path : 'register',
        loadComponent : () => import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path : 'home',
        loadComponent : () => import('./features/home/pages/home/home.component').then(m => m.HomeComponent)
    },
    // Student profile
    {
        path : 'profile-student',
        loadComponent : () => import('./features/student/pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    // Company profile
    {
        path : 'profile-company',
        loadComponent : () => import('./features/company/pages/profile/profile.component').then(m => m.ProfileComponent)
    }
];
