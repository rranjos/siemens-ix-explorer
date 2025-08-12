import { Routes } from '@angular/router';
import { CardListPageComponent } from './card-list/card-list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/card-list', pathMatch: 'full' },
  { path: 'card-list', component: CardListPageComponent },
  {
    path: 'right-pane',
    loadComponent: () =>
      import('./right-pane/right-pane.component').then(
        (c) => c.RightPaneComponent
      ),
  },
  {
    path: 'breadcrumb',
    loadComponent: () =>
      import('./breadcrumb/breadcrumb.component').then(
        (c) => c.BreadcrumbComponent
      ),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./tabs/tabs.component').then((c) => c.TabsComponent),
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./tree/tree.component').then((c) => c.TreeComponent),
  },
  {
    path: 'workflow',
    loadComponent: () =>
      import('./workflow/workflow.component').then((c) => c.WorkflowComponent),
  },
  {
    path: 'date-picker',
    loadComponent: () =>
      import('./date-picker/date-picker.component').then(
        (c) => c.DatePickerComponent
      ),
  },
  {
    path: 'date-dropdown',
    loadComponent: () =>
      import('./date-dropdown/date-dropdown.component').then(
        (c) => c.DateDropdownComponent
      ),
  },
  { path: '**', redirectTo: '/card-list' },
];
