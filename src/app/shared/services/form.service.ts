import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import validator from 'validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  buildForm(model, isCheckerForm) {
    let formgroup: FormGroup;
    const formGroupFields = this.getFormControlsFields(model, isCheckerForm);
    formgroup = new FormGroup(formGroupFields.formGroupFields);
    let fields = formGroupFields.fields;
    return { formgroup, fields };
  }

  getFormControlsFields(model, isCheckerForm) {
    const formGroupFields = {};
    let fields = [];
    for (const field of Object.keys(model)) {
      const fieldProps = model[field];
      const validators = this.addValidator(fieldProps.rules);
      this.createFormControl(
        fieldProps,
        field,
        formGroupFields,
        validators,
        fields,
        isCheckerForm
      );
    }
    return { formGroupFields, fields };
  }

  createFormControl(
    fieldProps,
    field,
    formGroupFields,
    validators,
    fields,
    isCheckerForm
  ) {
    if (fieldProps['type'] !== 'input-group') {
      fields.push({ ...fieldProps, fieldName: field });
      formGroupFields[field] = new FormControl(fieldProps.value, validators);
    } else {
      let form = this.buildForm(fieldProps['subModel'], isCheckerForm);
      fields.push({
        ...fieldProps,
        fieldName: field,
        subFields: form.fields,
      });
      formGroupFields[field] = form.formgroup;
    }
    if (fieldProps['checker'] && isCheckerForm) {
      formGroupFields[fieldProps['checker'].fieldName] = new FormControl(
        fieldProps['checker'].value,
        validators
      );
    }
  }

  private addValidator(rules) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules)
      .map((rule) => {
        switch (rule) {
          case 'required':
            return Validators.required;
          case 'userName':
            return this.isAlphabet.bind(this);
          case 'email':
            return this.isEmail.bind(this);
          case 'password':
            return Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            );
          case 'confirmedPassword':
            return this.confirmedPassword.bind(this);
          case 'maxValue':
            return this.maxValueValidator(rules[rule]);
          default:
            return null;
        }
      })
      .filter((v) => v !== null); // Filter out null validators if any case is missed

    return validators;
  }

  private maxValueValidator(max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value !== null && control.value > max) {
        return { maxValue: true };
      }
      return null;
    };
  }

  confirmedPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.parent?.get('confirmPassword')?.value) {
      return null;
    }
    const password = control.parent?.get('password')?.value;
    if (control.parent?.get('confirmPassword').value !== password) {
      return { confirmedPassword: true };
    }
    return null;
  }

  isAlphabet(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    const isValidAlphabetEn = value
      .split(' ')
      .every((word) => validator.isAlpha(word, 'en-US'));
    const isValidAlphabetAr = value
      .split(' ')
      .every((word) => validator.isAlpha(word, 'ar-EG'));
    if (value && !isValidAlphabetEn && !isValidAlphabetAr) {
      return { notAlphabet: true };
    }
    return null;
  }

  isEmail(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const value = control.value.trim() as string;
    if (value && !validator.isEmail(value)) {
      return { notEmail: true };
    }
    return null;
  }
}
