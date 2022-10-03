import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-validator-message',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss']
})
export class FormValidatorComponent {

  @Input() form!: FormGroup;
  @Input() field!: string;

  constructor(
  ) { }

  isFormInvalid() {
    try {
      //return !this.form.get(this.field).valid && this.form.get(this.field).touched;
      return this.form.invalid && this.form.touched;
    } catch (error) {
      return false;
    }
  }

  isInvalid() {
    try {
      return !this.form.get([this.field])!.valid && this.form.get([this.field])!.touched;
    } catch (error) {
      return false;
    }
  }

  isTouched() {
    try {
      return this.form.controls[this.field].touched;
    } catch (error) {
      return false;
    }
  }

  message() {
    let message = 'Campo obrigatório';
    const formError = this.form.get(this.field)?.errors;
    if (formError) {
      if (formError['digit'])
        message = 'Documento inválido'

    }

    return message;
  }

}
