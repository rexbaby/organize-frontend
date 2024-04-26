import { Routes } from '@angular/router';
import { CoreComponent } from './app-core/core.component';
import { NotfoundComponent } from './app-abnormal/notfound/notfound.component';
import { IndexComponent } from './app-cms/index/index.component';
import { PersonComponent } from './app-cms/person/person.component';
import { DistrictComponent } from './app-cms/district/district.component';
import { DeptComponent } from './app-cms/dept/dept.component';

export const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: 'index', component: IndexComponent },
      {
        path: 'district',
        component: DistrictComponent,
      },
      { path: 'district/:id/dept', component: DeptComponent },
      { path: 'district/:id/person', component: PersonComponent },

      { path: 'person', component: PersonComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
