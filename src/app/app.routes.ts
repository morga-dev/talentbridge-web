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
        path : 'dashboard-student',
        loadComponent : () => import('./features/student/pages/dashboard/dashboard.component').then(m => m.StudentDashboardComponent)
    },
    {
        path : 'dashboard-company',
        loadComponent : () => import('./features/company/pages/dashboard/dashboard.component').then(m => m.CompanyDashboardComponent)
    },
    {
        path : 'opportunities',
        loadComponent : () => import('./features/student/pages/vacancies/opportunity-list/opportunity-list.component').then(m => m.OpportunityListComponent)
    },
    {
        path : 'opportunity/:id',
        loadComponent : () => import('./features/student/pages/vacancies/opportunity-detail/opportunity-detail.component').then(m => m.OpportunityDetailComponent)
    },
    {
        path : 'applications',
        loadComponent : () => import('./features/student/pages/applications/application-list/application-list.component').then(m => m.ApplicationListComponent)    
    },
    {
        path : 'applications/:id',
        loadComponent : () => import('./features/student/pages/applications/application-detail/application-detail.component').then(m => m.ApplicationDetailComponent)
    },
    {
        path : 'profile-student',
        loadComponent : () => import('./features/student/pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path : 'profile-company',
        loadComponent : () => import('./features/company/pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path : 'notifications',
        loadComponent : () => import('./features/notifications/pages/notifications/notifications.component').then(m => m.NotificationsComponent)
    }
];
