import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EnvironmentProviderService } from '../core/environment-provider.service.js';

export interface Figure {
  figure: string;
  calc: [
    {
      type: string;
      exp: string;
    }
  ];
}

export interface CalcType {
  type: string;
  exp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient, envProvider: EnvironmentProviderService) {
    this.baseUrl = envProvider.current.apiBaseUri;
  }

  get(): Observable<Figure[]> {
    return this.httpClient.get<Figure[]>(`${this.baseUrl}/figure`);
  }

  getFigure(figure: string): Observable<Figure> {
    return this.httpClient.get<Figure>(`${this.baseUrl}/figure/${figure}`);
  }

  addFigure(figure: Figure): Observable<Figure[]> {
    return this.httpClient.post<Figure[]>(`${this.baseUrl}/figure`, figure)
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        }),
        map(value => value as Figure[])
      );
  }

  updateFigure(figure: Figure): Observable<Figure[]> {
    return this.httpClient.put<Figure[]>(`${this.baseUrl}/figure`, figure)
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        }),
        map(value => value as Figure[])
      );
  }
}
