import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { IndexComponent } from './index/index.component';
import { PersonComponent } from './person/person.component';
import { AreaComponent } from './area/area.component';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'area', component: AreaComponent },
      { path: 'person', component: PersonComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
