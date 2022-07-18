import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatch } from './../password-match';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';


@Component({
  selector: 'app-auth',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [LoginService, RegisterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  isSubmited = false;
  signupForm!: FormGroup;
  registrForm!: FormGroup;
  /*форма "Авторизация" signupForm вызывается при showSubContent = 1 */
  /*форма "Регистрация" registrForm вызывается при showSubContent = 2 */
  showSubContent: number = 1;
  hide = true;
  private user!: User;
  token: string = '';
  @ViewChild('regForm') regForm!: ElementRef;

  /* get email() { return this.signupForm.get('email'); }
    get password() { return this.signupForm.get('password'); } */

  constructor(private fb: FormBuilder, private loginService: LoginService, private cdr: ChangeDetectorRef, private registerService: RegisterService) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required,
      /* Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') */]],
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
  }

  public onAuthSubmit() {
    if (this.signupForm.valid) {
      this.loginService.login({
        login: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
        .subscribe((res) => {
          this.token = res.token;
          console.log(this.token);
          this.user.token = this.token;
          this.cdr.detectChanges();
          //this.cdr.markForCheck();
        });
    } else {
      console.log('Форма не валидна');

    }
    //this.signupForm.reset();
  }

  public showRegistrForm() {
    this.showSubContent = 2;

    this.registrForm = this.fb.group({
      emailReg: ['', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });

  }

  public onRegSubmit() {
    if (this.registrForm.valid) {
      this.user = {
        login: this.registrForm.value.email,
        password: this.generatePassword(),
        firstName: '',
        lastName: '',
        token: '',
        cart: [],
        favorites: [],
        orders: []
      }
      this.registerService.register({
        firstName: 'Гость',
        lastName: '',
        login: this.registrForm.value.emailReg,
        password: this.generatePassword()
      })
        .subscribe((res) => {
          //this.token = res.token;
          console.log(res);
          //this.user.token = this.token;
          //this.cdr.detectChanges();
          //this.cdr.markForCheck();
        })

      this.registrForm.reset();
      this.showSubContent = 3;
    }
  }

  public generatePassword(): string {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }


}
function input(arg0: string) {
  throw new Error('Function not implemented.');
}

