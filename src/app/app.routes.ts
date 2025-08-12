import { Routes } from '@angular/router';
import { CardListPageComponent } from './card-list/card-list-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/card-list', pathMatch: 'full' },
  { path: 'card-list', component: CardListPageComponent },
  { path: '**', redirectTo: '/card-list' },
];
