import { DataService } from 'src/app/shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Parser } from 'expr-eval';

@Component({
  selector: 'app-create-figure',
  templateUrl: './create-figure.component.html',
  styleUrls: ['./create-figure.component.scss']
})
export class CreateFigureComponent implements OnInit {
  form: FormGroup;
  figures: {
    name: string;
    tag: boolean;
  }[];

  loading = false;
  submitted = false;
  error = false;

  expr = new Parser();

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataService.get().subscribe(
      figures =>
        (this.figures = figures.map(f => ({
          name: f.figure,
          tag: false
        })))
    );
    this.form = this.fb.group({
      fName: ['', Validators.required],
      cType: ['', Validators.required],
      exp: ['',
        (control: AbstractControl) => this.validateExpression(control)]
    });
  }

  addTag(name) {
    return { name, tag: true };
  }

  addNew(value) {
    this.dataService.addFigure(value).subscribe(res => {
      this.loading = false;
      this.error = res ? false : true;
      if (res) {
        this.figures = res.map(f => ({
          name: f.figure,
          tag: false
        }));
        this.form.reset();
      }
    });
  }

  update(value) {
    this.dataService.updateFigure(value).subscribe(res => {
      this.loading = false;
      this.error = res ? false : true;
      if (res) {
        this.figures = res.map(f => ({
          name: f.figure,
          tag: false
        }));
        this.form.reset();
      }
    });
  }

  submit() {
    const { fName, cType, exp } = this.form.value;

    this.submitted = true;
    this.loading = true;

    fName.tag
      ? this.addNew({ fName, cType, exp })
      : this.update({ fName, cType, exp });
  }

  validateExpression(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    let error = null;

    try {
      this.expr.parse(val);
    } catch (err) {
      error = { isNotExp: true };
    }
    return error;
  }
}
