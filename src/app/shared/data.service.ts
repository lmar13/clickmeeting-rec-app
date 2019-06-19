import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import DataJson from '../../assets/data/figures.json';

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
  constructor() {}

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
}
