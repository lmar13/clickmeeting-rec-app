import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcComponent } from './components/calc/calc.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PickFigureComponent } from './components/pick-figure/pick-figure.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { CreateFigureComponent } from './components/create-figure/create-figure.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT_TOKEN } from './core/environment';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    LayoutComponent,
    PickFigureComponent,
    HeaderComponent,
    NavComponent,
    CreateFigureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
