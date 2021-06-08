import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  locations: string[] = ['Selangor', 'Pahang', 'KL', 'Penang'];
  empForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // * Form Builder injection*//
    // this.empForm = this.fb.group({
    //   name: 'Name here',
    //   phoneNumber: '',
    //   state: '',
    //   cert: this.fb.group({
    //     java: false,
    //     angular: false,
    //     dotnet: false,
    //   }),
    //   workExp: this.fb.array([this.fb.control('')]),
    // });

    // * Form Group, Form Control, Form Array injection*//
    this.empForm = new FormGroup({
      name: new FormControl('Name here', [Validators.required]),
      phoneNumber: new FormControl('1234'),
      state: new FormControl('Selangor'),
      cert: this.empForm = new FormGroup({
        java: new FormControl(false),
        angular: new FormControl(true),
        dotnet: new FormControl(false),
      }),
      workExp: new FormArray([
        new FormControl('experience 1'),
        new FormControl('experience 2'),
      ]),
    });
  }

  get workExp(): FormArray {
    return this.empForm.get('workExp') as FormArray;
  }

  onReactiveSubmit(): any {
    console.log('this.empForm', this.empForm);
  }

  addWorkExp(): any {
    // this.workExp.push(this.fb.control(''));
    this.workExp.insert(1, new FormControl(''));
  }
  removeWorkExp(index: number): any {
    this.workExp.removeAt(index);
  }

  selectState(event): any {
    this.empForm.patchValue({
      state: event.target.value,
    });
  }

  get f() {
    return this.empForm.controls;
  }

  forbiddenNameValidator(forbiddenName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value === forbiddenName ? { forbiddenName: {value: control.value}} : null;
    };
  }

}
