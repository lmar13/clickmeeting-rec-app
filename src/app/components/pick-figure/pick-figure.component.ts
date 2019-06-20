import { Figure } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalcType, DataService } from 'src/app/shared/data.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pick-figure',
  templateUrl: './pick-figure.component.html',
  styleUrls: ['./pick-figure.component.scss']
})
export class PickFigureComponent implements OnInit {
  form: FormGroup;
  figures = [] as string[];
  figuresArray = [] as Figure[];
  calcType = [] as CalcType[];
  showCalcType = false;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    this.dataService.get().subscribe(figures => {
      this.figuresArray = figures;
      this.figures = figures.map(f => f.figure);
    });
  }

  onFormChanges() {
    this.form.valueChanges.subscribe(form => {
      const { figure, calcType } = form;

      // fetch data for specified figure to get its own calculation type + show component
      if (figure) {
        this.calcType = this.figuresArray.find(f => f.figure === figure).calc as CalcType[];
        this.showCalcType = true;
      }

      // when user choose two necessary field we can proceed to fetch expresion and calculate it
      if (figure && calcType) {
        this.router.navigate([figure, calcType], {relativeTo: this.route});
      }
    });
  }
}
