import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { FormGroup, Validators, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';
import { HttpService } from '../services/http.service';
import { Observable, of, tap } from 'rxjs';
import { MailValidatorService } from '../services/mail-validator.service';


@Component({
  selector: 'app-auth',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [LoginService, RegisterService, HttpService, MailValidatorService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  isSubmited = false;
  signupForm!: FormGroup;
  registrForm!: FormGroup;
  showSubContent: number = 1;
  hide = true;
  private user!: User;
  token: string = '';
  @ViewChild('regForm') regForm!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private registerService: RegisterService,
    private http: HttpService,
    private mailValidationService: MailValidatorService
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, this.checkMailFormat]],
      password: ['', [Validators.required,
      Validators.minLength(1)]]
    });

  }


  public onAuthSubmit() {
    this.signupForm.get('email')?.markAsTouched();
    this.signupForm.get('password')?.markAsTouched();
    /*     if (this.signupForm.valid) {
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
        } */
    //this.signupForm.reset();
    console.log(this.signupForm);
  }

  public showRegistrForm() {
    this.showSubContent = 2;

    this.registrForm = this.fb.group({
      emailReg: ['', [Validators.required, /* this.checkMailFormat */], this.checkIsMailAvailable.bind(this)]
    });

  }

  public onRegSubmit() {
    this.registrForm.get('emailReg')?.markAsTouched();


    console.log(this.registrForm);


    /*     if (this.registrForm.valid) {
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
              console.log('Должно отправиться письмо на @mail (пока не реализовано)');

              //this.user.token = this.token;
              //this.cdr.detectChanges();
              //this.cdr.markForCheck();
            })
            .unsubscribe();

          this.registrForm.reset();
          this.showSubContent = 3;
        } */
  }

  public checkMailFormat(contol: FormControl) {
    const myReg = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
    const ok = myReg.exec(contol.value);
    if (!ok) {
      return {
        'mailFormatError': true
      };
    }
    return null;
  }

  public checkIsMailAvailable(control: FormControl): Observable<ValidationErrors> {
    return this.mailValidationService.validateMail(control.value);
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

