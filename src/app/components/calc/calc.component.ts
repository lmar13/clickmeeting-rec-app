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
  exprError = false;
  noVar = false;

  form: FormGroup;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getFigure(params.figure).subscribe(fig => {
        this.result = null;
        this.exp =
          fig.calc.find(c => c.type === params.calcType) || ({} as CalcType);
        this.form.get('displayExp').setValue(this.exp.exp);
        this.examineExp(this.exp.exp);
      });
    });

    this.form = this.fb.group({
      displayExp: ['']
    });
  }

  examineExp(exp: string) {
    try {
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
      this.exprError = false;

      if (this.varArray.length <= 0) {
        this.submit();
        this.noVar = true;
      } else {
        this.noVar = false;
      }
    } catch (error) {
      this.exprError = true;
    }
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
