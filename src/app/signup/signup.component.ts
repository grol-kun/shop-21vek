import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
//import { HttpService } from '../../../tmp/http.service';
import { Observable } from 'rxjs';
import { MailValidatorService } from '../services/mail-validator.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MailValidatorService, AuthService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  isSubmited = false;
  signupForm!: FormGroup;
  registrForm!: FormGroup;
  showSubContent: number = 1;
  hide = true;
  private user!: any;
  token: string = '';
  @ViewChild('regForm') regForm!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private mailValidationService: MailValidatorService,
    private authService: AuthService
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
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      this.authService.login({
        login: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
        .subscribe({
          next: (data) => {
            this.authService.setToken(data.token)
            this.authService.getuserInfo()
            //this.router.navigate(['/']);
          },
          error: (err) => console.error(err),
          complete: () => console.info('complete')
        })
      this.signupForm.reset();
    }
  }

  public showRegistrForm() {
    this.showSubContent = 2;

    this.registrForm = this.fb.group({
      emailReg: ['', [Validators.required, this.checkMailFormat], [this.checkIsMailAvailable.bind(this)]]
    });

  }

  public onRegSubmit() {
    this.registrForm.get('emailReg')?.markAsTouched();
    console.log(this.registrForm);
    if (this.registrForm.valid) {
      this.authService.register({
        firstName: 'Пользователь',
        lastName: '',
        login: this.registrForm.value.emailReg,
        password: this.generatePassword()
      })
        .subscribe({
          next: (data) => {
            console.log(data.token);
            this.authService.setToken(data.token)
            this.authService.getuserInfo()
            //this.router.navigate(['/']);
          },
          error: (err) => console.error(err),
          complete: () => console.info('complete')
        })
      this.registrForm.reset();
      this.showSubContent = 3;
    }
    //this.cdr.detectChanges();
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

