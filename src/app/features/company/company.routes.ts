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
        path: 'create-opportunity',
        loadComponent: () => import('./pages/opportunities/create-opportunity/create-opportunity.component').then(m => m.CreateOpportunityComponent)
    },
    {
        path: 'opportunities',
        loadComponent: () => import('./pages/opportunities/opportunity-list/opportunity-list.component').then(m => m.OpportunityListComponent)
    }

] as Routes;
