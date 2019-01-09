import { AbstractControl, ValidationErrors } from "@angular/forms";



export class CustomValidators {

    _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png", ".pdf"];

    static alphaNumericValidation(control: AbstractControl): ValidationErrors | null {
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        if (regExp.test(control.value) || control.value === '')
            return null;
        else
            return { 'alphaNumericValidation': true };
    }


    static validateSingleInput(_validFileExtensions) {
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
}
