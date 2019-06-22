import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from '../environments/environment';
import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { ENVIRONMENT_TOKEN } from './core/environment';
import { LayoutComponent, HeaderComponent, NavComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    NavComponent,
    ...components
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
