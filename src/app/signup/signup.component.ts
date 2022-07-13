import { Component, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
import { User } from '../user';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatch } from './../password-match';

@Component({
  selector: 'app-auth',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  genderList!: String[];
  signupForm!: FormGroup; // Declare the signupForm
  private user!: User;

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get gender() { return this.signupForm.get('gender'); }
  get terms() { return this.signupForm.get('terms'); }

  //Inject the formbuilder into the constructor
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.genderList = ['Male', 'Female', 'Others'];

    //Вариант с FormBuilder
    this.signupForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: this.fb.group({
        pwd: ['', [Validators.required,
        Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required,
        Validators.minLength(8)]]
      }, { validators: passwordMatch }),
      gender: ['', Validators.required],
      terms: ['', Validators.requiredTrue]
    });

    //Можем подписываться на изменения valueChanges в форме или в элементе формы :
/*     this.signupForm.valueChanges.subscribe((v) => {
      console.log(v)
    }); */

    this.signupForm.get('gender')?.valueChanges.subscribe((v) => {
      console.log(v)
    });

    //Подписываемся на изменение СТАТУСА statusChanges
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status)
    });

    //Сброс формы с присвоением начального значения в поле login
    this.signupForm.reset({ email: 'default_email@g.com' });

    //Вариант классический с FormGroup и FormControl
    /*   ngOnInit() {
        this.genderList = ['Male', 'Female', 'Others'];

        this.signupForm = new FormGroup({
          email: new FormControl('',
            [Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
          password: new FormGroup({
            pwd: new FormControl('', [Validators.required, Validators.minLength(8)]),
            confirmPwd: new FormControl('', [Validators.required, Validators.minLength(8)])
          }),
          gender: new FormControl('', Validators.required),
          terms: new FormControl('', Validators.requiredTrue)
        }) */
  }

  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
    }
  }

}
