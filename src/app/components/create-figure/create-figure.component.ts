import { DataService } from 'src/app/shared/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private dataService: DataService, private fb: FormBuilder) {}

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
      exp: ['', Validators.required]
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

    // const newExp = exp.split('').filter(v => v !== ' ').join(' ');
    // console.log(newExp);
    this.submitted = true;
    this.loading = true;

    fName.tag
      ? this.addNew({ fName, cType, exp })
      : this.update({ fName, cType, exp });
  }
}
