import { Routes } from '@angular/router';

export const routes: Routes = [
    // Landing
    {
        path: '',
        loadComponent: () =>
        import('./pages/landing/landing.component').then(m => m.LandingComponent),
    },

    // Rutas de auth
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes'),
    },

    // Rutas de estudiante
    {
        path: 'student',
        loadChildren: () => import('./features/student/student.routes'),
    },

    // Rutas de compañías
    {
        path: 'company',
        loadChildren: () => import('./features/company/company.routes'),
    },

    // Notificaciones
    {
        path: 'notifications',
        loadChildren: () => import('./features/notifications/notifications.routes'),
    },

    // Rutas no disponibles
    {
        path: '**',
        redirectTo: '',
    },
    
];
