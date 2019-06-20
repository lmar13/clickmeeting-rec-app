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

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataService.get().subscribe(figures => this.figures = figures.map(f => ({
      name: f.figure,
      tag: false,
    })));
    this.form = this.fb.group({
      fName: ['', Validators.required],
      cType: ['', Validators.required],
      exp: ['', Validators.required],
    });
  }

  addTag(name) {
    return { name, tag: true };
  }

  addNew(value) {
    this.dataService.addFigure(value).subscribe(res => console.log(res));
  }

  update(value) {
    this.dataService.updateFigure(value).subscribe(res => console.log(res));
  }

  submit() {
    const { fName, cType, exp } = this.form.value;

    // const newExp = exp.split('').filter(v => v !== ' ').join(' ');
    // console.log(newExp);

    fName.tag ? this.addNew({ fName, cType, exp }) : this.update({ fName, cType, exp });
  }

}
