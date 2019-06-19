import { DataService, Figure, CalcType } from './shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clickmeeting-rec-app';
  form: FormGroup;
  figures = [] as string[];
  calcType = [] as CalcType[];
  showCalcType = false;
  showCalc = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigate(['']); // reset route after browser refresh
    this.fetchData(); // fetch initial data

    // build form with 'two' fields
    this.form = this.fb.group({
      figure: ['', Validators.required],
      calcType: ['', Validators.required]
    });

    this.onFormChanges(); // subscribe to form changes
  }

  fetchData() {
    this.dataService.getFigures().subscribe(figures => {
      this.figures = figures;
    });
  }

  onFormChanges() {
    this.form.valueChanges.subscribe(form => {
      const { figure, calcType } = form;

      // fetch data for specified figure to get its own calculation type + show component
      if (figure) {
        this.dataService.getCalcTypesForFigure(figure).subscribe(calc => {
          this.calcType = calc;
          this.showCalcType = true;
        });
      }

      // when user choose two necessary field we can proceed to fetch expresion and calculate it
      if (figure && calcType) {
        this.router.navigate([figure, calcType]);
      }
    });
  }
}
