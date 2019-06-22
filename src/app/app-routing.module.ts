import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickFigureComponent, CalcComponent, CreateFigureComponent } from './components';

const routes: Routes = [
  {
    path: 'calc',
    component: PickFigureComponent,
    children: [
      {
        path: ':figure/:calcType',
        component: CalcComponent,
      },
    ]
  },
  {
    path: 'create',
    component: CreateFigureComponent,
  },
  {
    path: '',
    redirectTo: 'calc',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const components = [
  PickFigureComponent,
  CalcComponent,
  CreateFigureComponent
];


