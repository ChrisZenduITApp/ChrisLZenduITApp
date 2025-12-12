import { Routes } from '@angular/router';
import { PlaceholderPage } from './placeholder-page/placeholder-page';
import { ReportsPage } from './reports-page/reports-page';

/**
 * Main application routing configuration.
 * Defines the navigation paths and handles fallback routing.
 */
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/reports',
        pathMatch: 'full'
    },
    {
        path: 'forms',
        component: PlaceholderPage
    },
    {
        path: 'customers',
        component: PlaceholderPage
    },
    {
        path: 'submissions',
        component: PlaceholderPage
    },
    {
        path: 'history',
        component: PlaceholderPage
    },
    {
        path: 'reports',
        component: ReportsPage
    },
    {
        path: 'workflow',
        component: PlaceholderPage
    },
    {
        path: '**',
        redirectTo: '/reports'
    }
];
