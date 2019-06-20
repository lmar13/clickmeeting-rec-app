import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import DataJson from '../../assets/data/figures.json';
import { HttpClient } from '@angular/common/http';
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

  getAll(): Observable<Figure[]> {
    return of(DataJson as Figure[]);
  }

  getFigures(): Observable<string[]> {
    return of(DataJson.map(f => f.figure));
  }

  getFigure(figure: string): Observable<Figure> {
    return of(DataJson.find(f => f.figure === figure) as Figure);
  }

  getCalcTypesForFigure(figure: string): Observable<CalcType[]> {
    return of(DataJson.find(f => f.figure === figure).calc as CalcType[]);
  }

  addFigure(figure: Figure): Observable<Figure> {
    return this.httpClient.post<Figure>(`${this.baseUrl}/figure`, figure)
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        }),
        map(value => value as Figure)
      );
  }

  updateFigure(figure: Figure): Observable<Figure> {
    return this.httpClient.put<Figure>(`${this.baseUrl}/figure`, figure)
      .pipe(
        catchError(err => {
          console.log(err);
          throw err;
        }),
        map(value => value as Figure)
      );
  }
}
