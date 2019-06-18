import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {

  exp = {};

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getFigure(params.figure).subscribe(fig => {
        this.exp = fig.calc.find(c => String(c.typeId) === params.calcType) || {};
      });
    });
  }

}
