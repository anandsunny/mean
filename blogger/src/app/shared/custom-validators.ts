import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import {map, debounce, debounceTime, take} from 'rxjs/operators';
import { Observable } from "rxjs";


export class CustomValidators {


    _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".pdf"];

    static alphaNumericValidation(control: AbstractControl): ValidationErrors | null {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        if (regExp.test(control.value) || control.value === '')
            return null;
        else
            return { 'alphaNumericValidation': true };
    }

    // file extension validation through regular expression
    static validateSingleInput(_validFileExtensions: RegExp) {
        return (control: AbstractControl): ValidationErrors | null => {
            const fileName: string = control.value;
            const fileExt = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
            if (_validFileExtensions.test(fileExt)) {
                return null;
            } else {
                return { 'validateFile': true };
            }
        }
    }

    // regular pattern validation
    static patternValidation(_regExp: RegExp) {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlVal: string = control.value;
            if(_regExp.test(controlVal) || controlVal === '') {
                return null;
            } else {
                return { 'patternValidation': true };
            }
        }
    }

    // compaire password fields value
    static passCompaire(group: AbstractControl): {[key: string]: any} | null {
        const pass = group.get('pass');
        const cpass = group.get('cpass');
        if(pass.value === cpass.value || cpass.pristine) {
            return null;
        } else {
            return { 'passMisMetched': true };
        }
    }

    // // check email is available
    // static checkemail(authService: AuthService) {
    //     return (control: AbstractControl) => {
    //         return authService.checkEmail(control.value.toLowerCase()).subscribe((res: any) => {
    //             return res.success ? null : { 'emailTaken': true };
    //         });
    //     }
    // }

        // check username is available
        static checkUname(authService: AuthService) {
            return (control: AbstractControl): ValidationErrors | null => {
                 return authService.checkUsername(control.value.toLowerCase())
                 .pipe(
                     debounceTime(2000),
                     take(1),
                     map((res: any) => true ? null : { 'unameTaken': true })
                 )
                 //subscribe((res: any) => {
                //     return res.success ? null : { 'unameTaken': true };
                // });
            }
        }



}

// export function checkUname(signupService: AuthService): AsyncValidatorFn {
//     return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//         console.log(control.value)
//       return signupService.checkUsername(control.value.toLowerCase()).pipe(map((res) => {
//           console.log(res);
//         return res ? null : { 'unameTaken': true };
//       }));
//     };
//   }
