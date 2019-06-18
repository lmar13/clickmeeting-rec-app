import { Injectable } from '@angular/core';
import CalcTypeJson from '../../assets/data/calcType.json';
import FiguresJson from '../../assets/data/figures.json';
import { Observable, of } from 'rxjs';

export interface Figure {
  type: string;
  calc: [{
    typeId: number;
    exp: string;
  }];
}

export interface CalcType {
  _id: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAll(): Observable<Figure[]> {
    return of(FiguresJson as Figure[]);
  }

  getFigures(): Observable<string[]> {
    return of(FiguresJson.map(f => f.type));
  }

  getFigure(figure: string): Observable<Figure> {
    return of(FiguresJson.find(f => f.type === figure) as Figure);
  }

  getCalcType(): Observable<CalcType[]> {
    return of(CalcTypeJson as CalcType[])
  }
}
