import { CreateFigureComponent } from './components/create-figure/create-figure.component';
import { PickFigureComponent } from './components/pick-figure/pick-figure.component';
import { CalcComponent } from './components/calc/calc.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
