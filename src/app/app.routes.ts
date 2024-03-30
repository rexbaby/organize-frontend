import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: CoreComponent },
  { path: '**', component: NotFoundComponent },
];
