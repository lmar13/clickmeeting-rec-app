import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalcType, DataService } from './../../shared/data.service';
import { Parser } from 'expr-eval';

// TODO: create file constant.json, constant which user can input in expression will be kept
// TODO: add handling constant from file

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  exp = {} as CalcType;
  varArray = null;
  result = null;
  expr = new Parser();

  form: FormGroup;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getFigure(params.figure).subscribe(fig => {
        this.exp =
          fig.calc.find(c => c.type === params.calcType) || ({} as CalcType);
        this.form = this.fb.group({
          displayExp: [this.exp.exp]
        });
        this.examineExp(this.exp.exp);
      });
    });
  }

  examineExp(exp: string) {
    this.varArray = this.expr
      .parse(exp)
      .variables()
      .map(e => {
        this.form.addControl(
          e,
          new FormControl(
            e === 'pi' ? Math.PI : '',
            Validators.compose([
              Validators.required,
              (control: AbstractControl) => this.onlyNumbers(control)
            ])
          )
        );
        return e;
      });
  }

  submit() {
    this.result = this.expr.evaluate(this.form.value.displayExp, this.form.value);
  }

  onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const val = control.value;

    if (!isNaN(val)) {
      return null;
    }

    return { isNaN: true };
  }
}
