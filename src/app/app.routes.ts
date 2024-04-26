import { Routes } from '@angular/router';
import { CoreComponent } from './app-core/core.component';
import { NotfoundComponent } from './app-abnormal/notfound/notfound.component';
import { IndexComponent } from './app-cms/index/index.component';
import { PersonComponent } from './app-cms/person/person.component';
import { AreaComponent } from './app-cms/area/area.component';

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
