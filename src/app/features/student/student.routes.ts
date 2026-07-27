import { Routes } from "@angular/router";

export default [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.StudentDashboardComponent)
    },
    {
        path: 'opportunities',
        children: [
        {
            path: '',
            loadComponent: () => import('./pages/opportunities/opportunity-list/opportunity-list.component').then(m => m.OpportunityListComponent)
        },
        {
            path: ':id',
            loadComponent: () => import('./pages/opportunities/opportunity-detail/opportunity-detail.component').then(m => m.OpportunityDetailComponent)
        }
        ]
    },
    {
        path: 'applications',
        children: [
        {
            path: '',
            loadComponent: () => import('./pages/applications/application-list/application-list.component').then(m => m.ApplicationListComponent)
        },
        {
            path: ':id',
            loadComponent: () => import('./pages/applications/application-detail/application-detail.component').then(m => m.ApplicationDetailComponent)
        }
        ]
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'company/:id',
        loadComponent: () => import('./pages/company-profile/company-profile.component').then(m => m.CompanyProfileComponent)
    }

] as Routes;
