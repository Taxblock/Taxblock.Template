import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class CustomValidationService {
    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            return valid ? null : { invalidPassword: true };
        };
    }

    emailPatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
            const valid = regex.test(control.value);
            return valid ? null : { invalidEmail: true };
        };
    }

    mobileNumberPatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('[6-9]\\d{9}');
            const valid = regex.test(control.value);
            return valid ? null : { invalidMobileNo: true };
        };
    }

    panNumberPatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('[A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}');
            const valid = regex.test(control.value);
            return valid ? null : { invalidPanNo: true };
        };
    }

    panNumberResidentPatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('[A-Za-z]{3}[PCHFATBLJGgpchfatblj]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}');
            const valid = regex.test(control.value);
            return valid ? null : { invalidPanNo: true };
        };
    }

    namePatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp(/^(?=.{1,30}$)[a-z]+(?:['_.\s][a-z]+)*$/i);
            const valid = regex.test(control.value);
            return valid ? null : { invalidName: true };
        };
    }

    singleNamePatternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            const regex = new RegExp(/^[A-Za-z]{1,30}$/i);
            const valid = regex.test(control.value);
            return valid ? null : { invalidName: true };
        };
    }

    matchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
                return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
                return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
                confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
                confirmPasswordControl.setErrors(null);
            }
        }
    }

    userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.validateUserName(userControl.value)) {
                    resolve({ userNameNotAvailable: true });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    validateUserName(userName: string) {
        const UserList = ['ankit', 'admin', 'user', 'superuser'];
        return (UserList.indexOf(userName) > -1);
    }
}