import { Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { IndexComponent } from './cms/index/index.component';
import { PersonComponent } from './cms/person/person.component';
import { AreaComponent } from './cms/area/area.component';

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
