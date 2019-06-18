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

  constructor(private dataService: DataService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.fetchData();

    this.form = this.fb.group({
      figure: ['', Validators.required],
      calcType: ['', Validators.required]
    });

    this.onFormChanges()
  }

  fetchData() {
    this.dataService.getFigures().subscribe(figures => {
      this.figures = figures;
    });

    this.dataService.getCalcType().subscribe(ct => {
      this.calcType = ct;
    });
  }

  onFormChanges() {
    this.form.valueChanges.subscribe(form => {
      const {figure, calcType} = form;

      if(figure && calcType) {
        this.router.navigate([figure, calcType]);
      }
    })
  }
}
