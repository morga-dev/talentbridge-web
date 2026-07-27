import { Routes } from "@angular/router";

export default [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.CompanyDashboardComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'opportunities',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/opportunities/opportunity-list/opportunity-list.component').then(m => m.OpportunityListComponent)
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/opportunities/create-opportunity/create-opportunity.component').then(m => m.CreateOpportunityComponent)
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/opportunities/opportunity-list/opportunity-list.component').then(m => m.OpportunityListComponent)
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

] as Routes;
