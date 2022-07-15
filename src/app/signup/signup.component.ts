import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatch } from './../password-match';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-auth',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showSubContent: number = 1;
  hide = true;
  signupForm!: FormGroup;
  private user!: User;

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,
      Validators.minLength(2)]]
    });

    //Можем подписываться на изменения valueChanges в форме или в элементе формы :
    /*     this.signupForm.valueChanges.subscribe((v) => {
          console.log(v)
        }); */

    /* this.signupForm.get('gender')?.valueChanges.subscribe((v) => {
      console.log(v)
    }); */

    //Подписываемся на изменение СТАТУСА statusChanges
    /*     this.signupForm.statusChanges.subscribe((status) => {
          console.log(status)
        }); */

    //Сброс формы с присвоением начального значения в поле login
    /* this.signupForm.reset({ email: 'default_email@g.com' }); */
  }

  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      /* Any API call logic via services goes here */
    }
  }

}
